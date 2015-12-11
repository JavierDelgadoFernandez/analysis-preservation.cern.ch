define(["jquery", "alpaca","underscore", 'typeahead'], function($, alpaca, _){

  Alpaca.registerView({
    "id": "invenio-view",
    "parent": "web-edit",
    "horizontal": false,
    "type": "edit",
    "styles": {
      "upIcon": "fa fa-chevron-up",
      "downIcon": "fa fa-chevron-down",
      "addIcon": "fa fa-plus",
      "removeIcon": "fa fa-minus"
    },
    "templates": {
      "container": "/static/templates/container.html",
      "container-depositgroup": "/static/templates/container-depositgroup.html",
      "container-depositgroup-object": "/static/templates/container-depositgroup-object.html",
      "container-depositgroup-object-array": "/static/templates/container-depositgroup-object-array.html",
      "container-depositgroup-object-quickfill": "/static/templates/container-depositgroup-object-quickfill.html",
      "container-depositgroup-array": "/static/templates/container-depositgroup-array.html",
      "container-object-autocomplete-import": "/static/templates/container-object-autocomplete-import.html",
      "container-array-item": "/static/templates/container-array-item.html",
      "control-mlt-choice-cb": "/static/templates/control-mlt-choice-cb.html",
      "control-mlt-choice-radio": "/static/templates/control-mlt-choice-radio.html"
    }
  });

  Alpaca.registerView({
    "id": "invenio-display",
    "parent": "web-display",
    "horizontal": false,
    "type": "display",
    "styles": {
      "upIcon": "fa fa-chevron-up",
      "downIcon": "fa fa-chevron-down",
      "addIcon": "fa fa-plus",
      "removeIcon": "fa fa-minus"
    },
    "templates": {
      "container": "/static/templates/container.html",
      "container-depositgroup": "/static/templates/container-depositgroup.html",
      "container-depositgroup-object": "/static/templates/container-depositgroup-object.html",
      "container-depositgroup-object-array": "/static/templates/container-depositgroup-object-array.html",
      "container-depositgroup-object-quickfill": "/static/templates/container-depositgroup-object-quickfill.html",
      "container-depositgroup-array": "/static/templates/container-depositgroup-array.html",
      "container-object-autocomplete-import": "/static/templates/container-object-autocomplete-import.html",
      "container-array-item": "/static/templates/container-array-item.html",
      "control-mlt-choice-cb": "/static/templates/control-mlt-choice-cb.html",
      "control-mlt-choice-radio": "/static/templates/control-mlt-choice-radio.html"
    }
  });

  $.alpaca.Fields.DepositGroupField = $.alpaca.Fields.ObjectField.extend({
    getFieldType: function() {
      return "depositgroup";
    }
  });

  Alpaca.registerFieldClass("depositgroup", Alpaca.Fields.DepositGroupField);

  $.alpaca.Fields.DepositGroupObjectField = $.alpaca.Fields.ObjectField.extend({
    getFieldType: function() {
      return "depositgroup-object";
    }
  });

  Alpaca.registerFieldClass("depositgroup-object", Alpaca.Fields.DepositGroupObjectField);

  $.alpaca.Fields.MltChoiceCheckboxField = $.alpaca.Fields.CheckBoxField.extend({
    getFieldType: function() {
      return "mlt-choice-cb";
    }
  });

  Alpaca.registerFieldClass("mlt-choice-cb", Alpaca.Fields.MltChoiceCheckboxField);

  $.alpaca.Fields.MltChoiceRadioField = $.alpaca.Fields.RadioField.extend({
    getFieldType: function() {
      return "mlt-choice-radio";
    }
  });

  Alpaca.registerFieldClass("mlt-choice-radio", Alpaca.Fields.MltChoiceRadioField);

  $.alpaca.Fields.DepositGroupObjectArrayField = $.alpaca.Fields.ArrayField.extend({
    getFieldType: function() {
      return "depositgroup-object-array";
    }
  });

  Alpaca.registerFieldClass("depositgroup-object-array", Alpaca.Fields.DepositGroupObjectArrayField);

  $.alpaca.Fields.DepositGroupObjectQuickfillField = $.alpaca.Fields.ArrayField.extend({
    getFieldType: function() {
      return "depositgroup-object-quickfill";
    },
    postRender: function(callback) {
      var self = this;

      this.base (function(){
        self.updateToolbars();

        var droplist_btn;
        var droplist = self.field;
        droplist_btn = $(droplist).find(".droplist-btn");
        droplist = $(droplist).find(".droplist");
        droplist_btn.click(function(){

          var list = droplist.val().trim();
          if (list.length < 1){
            return false;
          }
          list = droplist.val().split('\n');

          self.resolveItemSchemaOptions(function(itemSchema, itemOptions, circular) {
            // we only allow addition if the resolved schema isn't circularly referenced
            // or the schema is optional
            if (circular)
            {
                return Alpaca.throwErrorWithCallback("Circular reference detected for schema: " + JSON.stringify(itemSchema), self.errorCallback);
            }

            // how many children do we have currently?
            var insertionPoint = self.children.length;
            var selfList = [];
            _.each(self.children, function(li){
              if(li["options"]["ac_input_value"]) 
                selfList.push(li["options"]["ac_input_value"]);
            });
            var newList = _.difference(list, selfList);

            console.log("SELF_LIST::", selfList);
            console.log("NEW_LIST::", newList);

            _.each(newList, function(listing){
              var extraOptions = {
                "ac_input_value": listing
              };
              var newOptions = $.extend({}, itemOptions);
              $.extend(newOptions, extraOptions);
              var itemData = Alpaca.createEmptyDataInstance(itemSchema);
              self.addItem(insertionPoint, itemSchema, newOptions, itemData, function(item) {
              });
              insertionPoint++;
            });
            console.log("childrenAfter::", self.children);

            return; 
          });
        });
        callback();
      });
    }
  });

  Alpaca.registerFieldClass("depositgroup-object-quickfill", Alpaca.Fields.DepositGroupObjectQuickfillField);

  $.alpaca.Fields.DepositGroupArrayField = $.alpaca.Fields.ArrayField.extend({
    getFieldType: function() {
      var self = this;
      console.log("########3", self);
      return "depositgroup-array";
    }
  });

  Alpaca.registerFieldClass("depositgroup-array", Alpaca.Fields.DepositGroupArrayField);

  $.alpaca.Fields.ObjectAutocompleteImportField = $.alpaca.Fields.ObjectField.extend({
    getFieldType: function() {
      return "object-autocomplete-import";
    },
    postRender: function(callback) {
      var self = this;
      console.log(self.field[0]);
      this.base(function() {
        console.log("postRender is starting::",self);
        var ac_input_field = "[name='"+self.name+"_ac_input']";
        console.log("AC_INPUT1::",ac_input_field);
        ac_input_field = $(ac_input_field);
        console.log("AC_INPUT::",ac_input_field.first());
        self.applyTypeAhead();
        if (ac_input_field.length == 1)
        {
          // autocomplete
          //self.applyAutocomplete();
          // mask
          //self.applyMask();
          // typeahead
          self.applyTypeAhead(ac_input_field[0]);

          // update max length indicator
          //self.updateMaxLengthIndicator();
        } 

        if (self.options && self.options.ac_input_value){
          if(self.options.typeahead.importSource) {
            var importSource = self.options.typeahead.importSource;

            if(importSource.type == "origin"){
              var url = window.location.origin+importSource.source;
            }
            else if (importSource.type == "remote"){
              var url = importSource.source;
            }
            if(url) {
              var importSourceData = importSource.data;
              var params = {};
              //_.each(importSourceData, function(param){
              params[importSourceData] = self.options.ac_input_value;
              //});
              $.getJSON(url, params, function( data ){
                console.log("DATA:::",data);
                var fillInData = {};
                if(self.options.typeahead.correlation){
                  var importData = recreateImportData(self.options.typeahead.correlation, data);
                  console.log("IMPORT:::",importData);
                  self.setValue(importData);
                }
              });
            }
          }
        }
        callback();
      });
    },
    applyTypeAhead: function() {
      var self = this;
      console.log("APPLY TYPEAHEAD::",self);
      if (self.options.typeahead && !Alpaca.isEmpty(self.options.typeahead))
      {
        var tConfig = self.options.typeahead.config;
        if (!tConfig) {
          tConfig = {};
        }

        var tDatasets = self.options.typeahead.datasets;
        if (!tDatasets) {
          tDatasets = {};
        }

        if (!tDatasets.name) {
          tDatasets.name = self.getId();
        }

        var tEvents = self.options.typeahead.events;
        if (!tEvents) {
          tEvents = {};
        }

        // support for each datasets (local, remote, prefetch)
        if (tDatasets.type === "local" || tDatasets.type === "remote" || tDatasets.type === "prefetch")
        {
          var bloodHoundConfig = {
            datumTokenizer: function(d) {
              var tokens = "";
              for (var k in d) {
                if (d.hasOwnProperty(k) || d[k]) {
                  tokens += " " + d[k];
                }
              }
              return Bloodhound.tokenizers.whitespace(tokens);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace
          };

          if (tDatasets.type === "local" )
          {
            var local = [];

            if (typeof(tDatasets.source) === "function")
            {
              bloodHoundConfig.local = tDatasets.source;
            }
            else
            {
              // array
              for (var i = 0; i < tDatasets.source.length; i++)
              {
                var localElement = tDatasets.source[i];
                if (typeof(localElement) === "string")
                {
                  localElement = {
                    "value": localElement
                  };
                }

                local.push(localElement);
              }

              bloodHoundConfig.local = local;
            }

            if (tDatasets.local)
            {
              bloodHoundConfig.local = tDatasets.local;
            }
          }

          if (tDatasets.type === "prefetch")
          {
            bloodHoundConfig.prefetch = {
              url: tDatasets.source
            };

            if (tDatasets.filter)
            {
              bloodHoundConfig.prefetch.filter = tDatasets.filter;
            }
          }

          if (tDatasets.type === "remote")
          {
            bloodHoundConfig.remote = {
              url: tDatasets.source
            };

            if (tDatasets.filter)
            {
              bloodHoundConfig.remote.filter = tDatasets.filter;
            }

            if (tDatasets.replace)
            {
              bloodHoundConfig.remote.replace = tDatasets.replace;
            }
          }

          var engine = new Bloodhound(bloodHoundConfig);
          engine.initialize();
          tDatasets.source = engine.ttAdapter();
        }

        // compile templates
        if (tDatasets.templates)
        {
          for (var k in tDatasets.templates)
          {
            var template = tDatasets.templates[k];
            if (typeof(template) === "string")
            {
              tDatasets.templates[k] = Handlebars.compile(template);
            }
          }
        }

        // process typeahead
        var ac_input = self.field;
        ac_input = $(ac_input).find(".autocomplete-input-field");
        ac_input.typeahead(tConfig, tDatasets);
        //$(self.control).typeahead(tConfig, tDatasets);
        // listen for "autocompleted" event and set the value of the field
        ac_input.on("typeahead:autocompleted", function(event, datum) {
          console.log("CHANGEDTO::", datum.value);
          self.setValue(datum.value);
          ac_input.change();
        });

        // listen for "selected" event and set the value of the field
        ac_input.on("typeahead:selected", function(event, datum) {
          //self.setValue(datum.value);
          console.log("CHANGEDTO::", datum.value);
          if(self.options.typeahead.importSource) {
            var importSource = self.options.typeahead.importSource;

            if(importSource.type == "origin"){
              var url = window.location.origin+importSource.source;
            }
            else if (importSource.type == "remote"){
              var url = importSource.source;
            }
            if(url) {
              var importSourceData = importSource.data;
              var params = {};
              //_.each(importSourceData, function(param){
              params[importSourceData] = datum.value;
              //});
              $.getJSON(url, params, function( data ){
                console.log("DATA:::",data);
                var fillInData = {};
                if(self.options.typeahead.correlation){
                  var importData = recreateImportData(self.options.typeahead.correlation, data);
                  console.log("IMPORT:::",importData);
                  self.setValue(importData);
                }

              });
            }
          }

          ac_input.change();
          console.log("CHANGEDTO::", datum.value);
        });

        // custom events
        if (tEvents)
        {
          if (tEvents.autocompleted) {
            $(self.control).on("typeahead:autocompleted", function(event, datum) {
              tEvents.autocompleted(event, datum);
            });
          }
          if (tEvents.selected) {
            $(self.control).on("typeahead:selected", function(event, datum) {
              tEvents.selected(event, datum);
            });
          }
        }

        // when the input value changes, change the query in typeahead this is
        // to keep the typeahead control sync'd with the actual dom value only
        // do this if the query doesn't already match
        var fi = ac_input;
        ac_input.change(function() {
          console.log("CHAN---TO::", $(this).val());

          var value = $(this).val();

          var newValue = $(fi).typeahead('val');
          if (newValue !== value) {
            console.log("hereeee");
            $(fi).typeahead('val', newValue);
          }

        });

        // some UI cleanup (we don't want typeahead/ to restyle)
        $(self.field).find("span.twitter-typeahead").first().css("display", "block"); // SPAN to behave more like DIV, next line
        $(self.field).find("span.twitter-typeahead input.tt-input").first().css("background-color", "");
      }
    },

    prepareControlModel: function(callback)
    {
      var self = this;

      this.base(function(model) {

        model.inputType = self.inputType;

        callback(model);
      });
    },

  });

  Alpaca.registerFieldClass("object-autocomplete-import", Alpaca.Fields.ObjectAutocompleteImportField);

  $.alpaca.Fields.Select2Field = $.alpaca.Fields.SelectField.extend({
    getFieldType: function() {
      return "select2";
    },
    afterRenderControl: function(model, callback) {
      var self = this;

      this.base(model, function() {
          if (self.options.select2 && $.fn.select2){
            $(self.getControlEl()).select2();
          }

          callback();
      });
    }
  });

  Alpaca.registerFieldClass("select2", Alpaca.Fields.Select2Field);

  var recreateImportData = function(object, data){
    var tmp_data = {};
    console.log("RECREATING::", data);
    _.each(object, function(value, key){
      if (Alpaca.isString(value)) {
        tmp_data[key] = data[value];
      }
      else if (Alpaca.isObject(value)){
        tmp_data[key] = recreateImportData(value, data);
      }
      console.log("TMPDATA::",tmp_data);
    });

    return tmp_data;
  };
  return {}
});
