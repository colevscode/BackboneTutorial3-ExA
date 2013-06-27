App = this.App || {};

App.Photos = Backbone.Collection.extend({
  url: "/backlift/toc/photos"
});

App.Captions = Backbone.Collection.extend({
  url: "/backlift/data/captions",
  forFile: function(file) {
    return this.find(function(item) {
      return item.get('file') == file;
    });
  }
});