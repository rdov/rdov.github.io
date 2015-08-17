/**
 * Create graphs by using the data from data.js and the helpers
 * at diagram.js
 */

render = {};


render.links = function(links) {
  links.forEach(function(link) {
    if ($.isArray(link)) {
      diagram.createLink(link[0], link[1]);
    } else {
      diagram.createLink(link.source, link.target, link.head);
    }
  });
};


render.texts = function(texts) {
  texts.forEach(function(text) {
    var placement = text.placement;
    var position = text.position;

    if (placement && !position) {
      var reference = diagram.elements[placement[0]];
      var where = placement[1];
      if (reference) {
        position = {
          x: reference.position.x + (where.right ? reference.size.width * where.right : 20),
          y: reference.position.y + (where.below ? reference.size.height * where.below : 10)
        };
      }
    }

    diagram.createText(text.content, position, text.size);
  });
};


render.main = function(info, wrapComponents) {

  wrapComponents = false;  // XXX

  /* Components. */
  var baseX = 190;

  var startY = 30;
  diagram.createText(
    info.components.routed.title,
    {x: baseX, y: startY}, {width: 600, height: 20});

  var bbox1 = diagram.createHorizontalElements(
    {x: baseX, y: startY + 30, width: paperSettings.width},
    info.components.routed.elements,
    diagram.cellStyle.reactComponent
  );
  bbox1.y1 = startY - 10;
  if (wrapComponents) {
    diagram.createParent(bbox1, 'routedComponents', info.components.routed.elements);
  }

  var incY = 30;
  if (info.components.others.title) {
    incY = 60;
    diagram.createText(
      info.components.others.title,
      {x: baseX, y: bbox1.y2 + 30}, {width: 600, height: 20});
  }
  var bbox2 = diagram.createHorizontalElements(
    {x: baseX, y: bbox1.y2 + incY, width: paperSettings.width},
    info.components.others.elements,
    diagram.cellStyle.reactComponent
  );
  bbox2.y1 = bbox1.y2 + 20;
  if (wrapComponents) {
    diagram.createParent(bbox2, 'otherComponents', info.components.others.elements);
  }

  var bbox = {
    x1: baseX - 20, y1: startY - 20,
    x2: Math.max(bbox1.x2, bbox2.x2) + 10, y2: bbox2.y2 + 10
  };
  if (wrapComponents) {
    diagram.createParent(
      bbox, 'components', ['routedComponents', 'otherComponents'],
      {filter: {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 0.2}}}
    );
  }


  /* Actions. */
  diagram.createText(
    info.actions.title,
    {x: 15, y: 20}, {width: 130, height: 32},
    {'font-size': 13}
  );
  var x = 20;
  var y = 60;
  info.actions.elements.forEach(function(name) {
    diagram.createElement(name, diagram.cellStyle.reactAction, function() {
      var position = {x: x, y: y};
      y += diagram.cellStyle.size.height + 20;
      return position;
    })
  });
  /*var bbox = {
    x1: 10, y1: 10,
    x2: diagram.cellStyle.size.width + 10 + 20, y2: y - 10
  };
  diagram.createParent(bbox, 'actions', info.actions.elements);*/


  /* Stores. */
  var y = Math.max(y, bbox.y2 + 20);
  //msg({x: baseX, y: 665}, info.stores.title, true);
  diagram.createText(
    info.stores.title,
    {x: baseX, y: y + 10}, {width: 600, height: 20},
    {'font-size': 13}
  );
  var bbox = diagram.createHorizontalElements(
    {x: baseX, y: y + 40, width: paperSettings.width},
    info.stores.elements,
    diagram.cellStyle.reactStore
  );
  //diagram.createParent(bbox, 'stores', info.stores.elements);


  render.links(info.links || []);
  render.texts(info.texts || []);

  graph.fromJSON({cells: diagram.cells});
};


render.all = function() {
  render.main(data, true);
};


render._filter = function(candidates, targets) {
  return candidates.map(function(element) {
    var inArray = $.inArray(element.name, targets) > -1;
    return $.extend({}, element, {hide: !inArray});
  });
};


render.generic = function(entry) {
  if (entry === 'all') {
    return render.all();
  }

  var entryData = data.diagram[entry];
  if (!entryData.title) {
    entryData.title = {};
  }
  if (!entryData.components) {
    entryData.components = {};
  }

  var info = {
    actions: {
      title: entryData.title.actions,
      elements: this._filter(data.actions.elements, entryData.actions)
    },
    stores: {
      title: entryData.title.stores,
      elements: this._filter(data.stores.elements, entryData.stores)
    },
    components: {
      routed: {
        title: entryData.title.routed,
        elements: this._filter(data.components.routed.elements, entryData.components.routed)
      },
      others: {
        title: entryData.title.others,
        elements: this._filter(data.components.others.elements, entryData.components.others)
      }
    },
    links: entryData.links,
    texts: entryData.texts
  };

  this.main(info);
};
