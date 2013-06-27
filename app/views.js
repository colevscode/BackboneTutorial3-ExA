App = this.App || {};

App.GalleryView = Backbone.View.extend({
  render: function() {
    var self = this;
    self.$el.empty();
    self.collection.each(function(photo) {
      self.renderPhoto(photo);
    });
    return self;
  },
  renderPhoto: function(photo) {
    var caption = this.options.captions.forFile(photo.get('file'));
    var params = {
      photo: photo.toJSON(),
      caption: caption ? caption.toJSON() : ""
    };
    this.$el.append(Handlebars.templates.photo(params));
    return this;
  },
  events: {
    "change input": "captionChange",
    "submit form": "formSubmit",
  },
  captionChange: function(ev) {
    var data = {
      file: $(ev.target).parent().attr("id"),
      text: $(ev.target).val()
    };
    var caption = this.options.captions.forFile(data.file);
    if (caption) {
      caption.save(data);
    } else {
      this.options.captions.create(data);
    }
  },
  formSubmit: function(ev) {
    ev.preventDefault();
    $(ev.target).find("input").blur();
  }
});
