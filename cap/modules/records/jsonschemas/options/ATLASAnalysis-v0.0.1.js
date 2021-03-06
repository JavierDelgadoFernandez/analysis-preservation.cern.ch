window.schemaOptions = {
    "fields": {
      "basic_info": {
        "order": 1,
        "label": false,
        "type": "depositgroup",
        "fields": {
          "analysis_number": {
            "placeholder": "Please provide analysis number"
          }
        }
      },
      "aod_processing": {
        "type": "depositgroup",
        "order": 2,
        "label": false,
        "fields": {
          "primary_datasets": {
            "type": "depositgroup-object-array",
            "order": 1,
            "droplist": "true",
            "actionbar": false,
            "toolbarSticky": false,
            "fields": {
              "item": {
                "type": "object-autocomplete-import"
              }
            }
          },
          "mc_dataset": {
            "type": "depositgroup-object-array",
            "description": "Add Monte Carlo datasets",
            "order": 2,
            "droplist": "true",
            "actionbar": false,
            "toolbarSticky": false,
            "fields": {
              "item": {
                "type": "object-autocomplete-import"
              }
            }
          },
          "triggers": {
            "order": 3,
            "actionbarStyle": "bottom",
            "toolbarSticky": "true",
            "type": "depositgroup-object-array",
            "fields": {
              "item": {
                "fields": {
                  "trigger": {
                    "order": 1,
                    "type": "select2",
                    "select2": true,
                    "dataSource": "/records/jsonschemas/fields/triggerSelection.json"
                  },
                  "otherr": {
                    "order": 2
                  },
                  "run_period": {
                    "hidden": true
                  },
                  "efficiency": {
                    "hidden": true
                  },
                  "name": {
                    "hidden": true
                  }
                }
              }
            }
          }
        }
      },
      "physics_information": {
        "order": 4,
        "toolbarSticky": "true",
        "type": "depositgroup-array",
        "fields": {
          "item": {
            "fields":{
              "final_state_particles": {
                "order": 1,
                "minItems": 1,
                "type": "depositgroup-object-array",
                "fields": {
                  "item": {
                    "fields": {
                      "particle": {
                        "placeholder": "Particle",
                        "noneLabel": "Select Particle",
                        "type": "select2",
                        "select2": true,
                        "order": 1
                      },
                      "number": {
                        "placeholder": "Number",
                        "order": 2
                      },
                      "pt_cut": {
                        "placeholder": "PT Cut",
                        "order": 3
                      },
                      "era_cut": {
                        "placeholder": "ETA Cut",
                        "order": 4
                      }
                    }
                  }
                }
              },
              "physics_object": {
                "order": 2,
                "type": "depositgroup-object-array"
              },
              "cuts": {
                "order": 3,
                "type": "depositgroup-object-array",
                "minItems": 1
              },
              "veto": {
                "order": 4,
                "minItems": 1,
                "type": "depositgroup-object-array",
                "fields": {
                  "item": {
                    "fields": {
                      "particle": {
                        "placeholder": "Particle",
                        "noneLabel": "Select Particle",
                        "type": "select2",
                        "select2": true,
                        "order": 1
                      },
                      "number": {
                        "placeholder": "Number",
                        "order": 2
                      },
                      "pt_cut": {
                        "placeholder": "PT Cut",
                        "order": 3
                      },
                      "era_cut": {
                        "placeholder": "ETA Cut",
                        "order": 4
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "post_aod_processing": {
        "order": 5,
        "type": "depositgroup-array",
        "toolbarSticky": "true",
        "fields": {
          "item": {
            "fields": {
              "input_data": {
                "type": "depositgroup-object-array",
                "order": 4,
                "fields": {
                  "item": {
                    "fields": {
                      "filename": {
                      },
                      "url": {
                        "type": "url"
                      }
                    }
                  }
                }
              },
              "output_data": {
                "type": "depositgroup-object-array",
                "order": 5,
                "fields": {
                  "item": {
                    "fields": {
                      "url": {
                        "type": "url-harvest",
                        "order": 1
                      }
                    }
                  }
                }
              },
              "os": {
                "type": "depositgroup-object-array",
                "order": 1,
                "fields": {
                  "item": {
                    "fields": {
                      "name": {
                        "placeholder": "Name"
                      },
                      "version": {
                        "placeholder": "Version"
                      }
                    }
                  }
                }
              },
              "software": {
                "type": "depositgroup-object-array",
                "order": 2,
                "fields": {
                  "item": {
                    "fields": {
                      "name": {
                        "placeholder": "Software Used"
                      },
                      "version": {
                        "placeholder": "Version"
                      },
                      "global_tag": {
                        "placeholder": "Tag"
                      }
                    }
                  }
                }
              },
              "user_code": {
                "type": "depositgroup-object-array",
                "order": 3,
                "fields": {
                  "item": {
                    "fields": {
                      "url": {
                        "type": "url-harvest",
                        "placeholder": "URL",
                        "order": 1
                      },
                      "tag": {
                        "placeholder": "Tag",
                        "order": 2
                      }
                    }
                  }
                }
              },
              "run_instructions": {
                "type": "depositgroup-object-array",
                "order": 6,
                "fields": {
                  "item": {
                    "fields": {
                      "type": {
                        "type": "select",
                        "optionLabels": ["README file", "Makefile", "Upload something else"]
                      }
                    }
                  }
                }
              },
              "keywords": {
                "type": "tags",
                "order": 7
              },
              "comments": {
                "order": 8,
                "type": "textarea",
                "rows": 10
              }
            }
          }
        }
      },
      "documentations": {
        "order": 6,
        "type": "depositgroup-array",
        "toolbarSticky": "true",
        "fields": {
          "item": {
            "ref_id": {
              "order": 1
            },
            "url": {
              "order": 2
            },
            "keyword": {
              "type": "tags",
              "order": 3
            },
            "comment": {
              "order": 4
            }
          }
        }
      },
      "internal_discussions": {
        "type": "depositgroup-array",
        "order": 7,
        "fields": {
        }
      },
      "presentations": {
        "type": "depositgroup-array",
        "order": 8,
        "fields": {
        }
      },
      "publications": {
        "order": 9,
        "type": "depositgroup-array",
        "fields": {
          "item": {
            "fields": {
              "journal_title": {
                "order": 1
              },
              "journal_year": {
                "order": 2
              },
              "journal_volume": {
                "order": 3
              },
              "journal_issue": {
                "order": 4
              },
              "journal_page": {
                "order": 5
              },
              "persistent_identifiers": {
                "type": "depositgroup-object-array",
                "order": 6
              },
              "editorial_board": {
                "type": "depositgroup-object-array"
              }
            }
          }
        }
      },
      "keywords": {
        "type": "tags",
        "format": "textarea",
        "order": 10
      }
    }
  };
