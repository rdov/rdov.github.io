/**
 * A couple of helpers for creating and managing a graph in JSON
 * with SVG styles.
 */

var diagram = {};

diagram.cellStyle = {
  rect: {
    stroke: '#cccccc',
    'stroke-width': 2,
    rx: 3
  },
  strokeLink: 'black',
  reactComponent: {
    fill: '#53DD61'
  },
  reactStore: {
    fill: '#EDDBF6'
  },
  reactAction: {
    fill: '#7ACFDC'
  },

  text: {
    fill: '#000000',
    'font-size': 13,
    'font-family': "'Helvetica Neue', helvetica",
    'font-weight': '500'
  },
  noLink: '#444444',

  size: {width: 110, height: 55}
};

diagram.textStyle = {
  rect: {
    'stroke-width': 0,
    rx: 0
  },
  text: {
    'ref-x': 0,
    'ref-y': 0,
    'x-alignment': 'left',
    'y-alignment': 'top',
    'font-size': 16,
    'font-weight': 400
  }
};

diagram.linkStyle = {
  connector: {name: 'rounded'},
  connection: {
    stroke: '#333333',
    'stroke-width': 1.25
  },
  markerTarget: {
    fill: '#333333',
    d: 'M 6 0 L 0 3 L 6 6 z'
  }
};

diagram.regionStyle = {
  fill: 'white',
  rx: 0,
  'stroke-width': 1,
  stroke: '#cccccc'
};

diagram.id = 0;
diagram.elements = {};
diagram.cells = [];
diagram.toBack = 0;


diagram.clearTemp = function() {
  var newCells = [];

  /* Remove all links and text elements. */
  this.cells.forEach(function(cell) {
    if (cell.type === 'link' ||
        !cell.attrs.rect['stroke-width']) {
      return;
    }
    newCells.push(cell);
  });

  this.cells = newCells;
};


diagram.rect = function(name, params) {
  if (this.elements[name]) {
    return this.elements[name];
  }

  this.id++;

  var element = {
    id: this.id.toString(),
    type: 'basic.Rect',
    attrs: {
      text: $.extend({}, this.cellStyle.text, params.textStyle),
      rect: $.extend({}, this.cellStyle.rect, params.style)
    },
    position: params.position,
    size: params.size || this.cellStyle.size,
    z: 2
  };

  element.attrs.text.text = params.text;

  if (params.linkTo) {
    element.prop = {linkTo: params.linkTo};
    element.attrs.rect.stroke = this.cellStyle.strokeLink;
  } else {
    element.attrs.text.fill = this.cellStyle.noLink;
  }

  this.elements[name] = element;

  return element;
};


diagram.link = function(source, target, displayHead) {
  this.id++;

  var attrs = {'.connection': this.linkStyle.connection};
  if (displayHead) {
    attrs['.marker-target'] = this.linkStyle.markerTarget;
  }

  return {
    id: this.id.toString(),
    type: 'link',
    source: {id: this.elements[source].id},
    target: {id: this.elements[target].id},
    connector: this.linkStyle.connector,
    router: {name: 'manhattan'},
    attrs: attrs,
    z: -2
  };
};


diagram._parseName = function(name) {
  if (typeof name === 'string') {
    return {raw: name};
  }

  var res = {
    raw: name.name,
    pretty: name.pretty || name.name,
    style: name.style || {},
    linkTo: name.link,
    hide: name.hide,
    size: name.size,
    textStyle: name.textStyle
  };
  return res;
};


diagram.createLink = function(source, target, displayHead) {
  this.cells.push(this.link(source, target, displayHead));
};


diagram.createElement = function(name, style, calcPosition) {
  var res = this._parseName(name);
  var element = this.rect(res.raw, {
    linkTo: res.linkTo,
    text: res.pretty,
    style: $.extend({}, style, res.style),
    textStyle: res.textStyle,
    size: res.size,
    position: calcPosition()
  });

  element.attrs.rect.display = res.hide ? 'none' : 'block';
  element.attrs.text.display = res.hide ? 'none' : 'block';
  this.cells.push(element);
  return element;
};


diagram.createText = function(text, position, size, style) {
  if (!text) {
    return null;
  }

  var element = this.createElement({
    name: joint.util.uuid(),
    pretty: text,
    size: size,
    textStyle: $.extend({}, this.textStyle.text, style)
  }, this.textStyle.rect, function() { return position; });

  element.z = -1;
  return element;
};


diagram.nextHorizontal = function(startX, x, y, width) {
  var inc = this.cellStyle.size.width + 20;
  var newX = x + inc;
  var beforeX = newX;
  var newY = y;

  if (newX + inc >= width) {
    /* Start a new row. */
    newX = startX;
    newY += this.cellStyle.size.height + 20;
  }

  return {x: newX, y: newY, beforeX: beforeX};
};


diagram.createHorizontalElements = function(pos, elems, style) {
  var width = pos.width;
  var maxX = 0;
  var currPos = {x: pos.x, y: pos.y};
  var prevPos = {x: pos.x, y: pos.y};

  var self = this;
  elems.forEach(function(name) {
    if (name.linebreak) {
      /* Force a line break. */
      if (currPos.x !== pos.x) {
        currPos.x = pos.x;
        currPos.y += self.cellStyle.size.height + 20;
      }
      return;
    } else if (name.skip) {
      /* Skip one element. */
      currPos.x += self.cellStyle.size.width + 20;
      return;
    }

    self.createElement(name, style, function() {
      var position = currPos;
      prevPos = currPos;
      currPos = self.nextHorizontal(pos.x, currPos.x, currPos.y, width);

      if (currPos.beforeX > maxX) {
        maxX = currPos.beforeX;
      }

      return position;
    });
  });

  var bbox = {
    x1: pos.x - 10, y1: pos.y - 10,
    x2: maxX - 10, y2: prevPos.y + this.cellStyle.size.height + 10
  };
  return bbox;
};


diagram.createParent = function(bbox, name, names, style) {
  this.toBack--;

  var style = $.extend({}, this.regionStyle, style || {});
  var region = this.rect(name, {
    text: '',
    style: style,
    position: {x: bbox.x1, y: bbox.y1},
    size: {
      width: bbox.x2 - bbox.x1,
      height: bbox.y2 - bbox.y1
    }
  });

  region.embeds = [];
  region.z = this.toBack;

  names.forEach(function(name) {
    if (name.linebreak || name.skip) {
      /* A meta-element. */
      return;
    }
    var raw = this._parseName(name).raw;
    region.embeds.push(this.elements[raw].id);
    this.elements[raw].parent = region.id;
  }, this);

  this.cells.push(region);
  return region;
};
