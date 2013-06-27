App = this.App || {};

function withCollections(collections, fn) {
  _.each(collections, function(col) {
    col.fetch({
      success: function() {
        col.fetched = true;
        var done = _.every(collections, function(item) {
          return item.fetched == true;
        });
        if (done) {
          fn.call();
        }
      }
    })
  });
}

function main() {
  App.photos = new App.Photos();
  App.captions = new App.Captions();

  App.gallery = new App.GalleryView({ 
    collection: App.photos,
    captions: App.captions,
    el: "#gallery",
  });

  withCollections([App.photos, App.captions], function() {
    App.gallery.render();
  });
}

// run main() on page load
$(main);