"""Access blueprint in order to dispatch the login request."""

from __future__ import absolute_import, print_function

from collections import deque

from flask import Blueprint, current_app, g, redirect, session, url_for
from flask_login import current_user
from flask_principal import AnonymousIdentity, Identity, Principal, RoleNeed

from invenio_oauthclient.signals import account_setup_received, account_info_received

access_blueprint = Blueprint('cap_access', __name__,
                             url_prefix='/access',
                             template_folder='templates')

# principal = Principal(current_app)


@access_blueprint.record_once
def init(state):
    """Sets the identity loader and saver for the current application."""
    principal = state.app.extensions['security'].principal
    principal.identity_loaders = deque([identity_loader_session])
    principal.identity_savers = deque([identity_saver_session])


def identity_loader_session():
    """Load the identity from the session."""
    try:
        identity = Identity(
            session['identity.id'], session['identity.auth_type'])
        if current_app.config.get('ENABLE_SUPERPOWERS_FOR_EVERYONE', False):
            egroups = get_egroups_roles_relations()
            identity.provides = set(egroups['data-preservation-admins'])
        else:
            identity.provides = session['identity.provides']
        return identity
    except KeyError:
        return None


def identity_saver_session(identity):
    """Save identity to the session."""
    session['identity.id'] = identity.id
    session['identity.auth_type'] = identity.auth_type
    session['identity.provides'] = identity.provides


@account_info_received.connect
def oauth_response_info(remote, token=None, response=None, account_info=None):
    """Adds the current identity provides using the OAuth information"""
    # Requests of all the information about the current user.

    me = remote.get('https://oauthresource.web.cern.ch/api/Me')
    # Gets the relation between e-groups and concrete roles.
    egroups_roles_relations = get_egroups_roles_relations()
    # For each item in the user information response, if it is a "Group" item,
    # we add the needs allowed to that group.
    for item in me.data:
        if item['Type'] == 'http://schemas.xmlsoap.org/claims/Group':
            g.identity.provides |= set(
                egroups_roles_relations.get(item['Value'], []))
    identity_saver_session(g.identity)


@account_setup_received.connect
def oauth_response_setup(remote, token=None, response=None, account_setup=None):
    """Adds the current identity provides using the OAuth information"""

    # Requests of all the information about the current user.
    me = remote.get('https://oauthresource.web.cern.ch/api/Me')
    # Gets the relation between e-groups and concrete roles.
    egroups_roles_relations = get_egroups_roles_relations()
    # For each item in the user information response, if it is a "Group" item,
    # we add the needs allowed to that group.
    for item in me.data:
        if item['Type'] == 'http://schemas.xmlsoap.org/claims/Group':
            g.identity.provides |= set(
                egroups_roles_relations.get(item['Value'], []))
    identity_saver_session(g.identity)


def get_egroups_roles_relations():
    # Dictionary linking e-group with concrete roles
    collab_egroups = current_app.config.get('CAP_COLLAB_EGROUPS')

    result = {}
    for collab, collab_roles in collab_egroups.iteritems():
        for collab_role, egroups in collab_roles.iteritems():
            for egroup in egroups:
                result[egroup] = [RoleNeed(collab_role)]

    # In the case of CAP developer, they have all the possible roles.
    all_roles = []
    for item in result.values():
        all_roles += item
    result['analysis-preservation-support'] = all_roles
    result['data-preservation-admins'] = all_roles

    return result
