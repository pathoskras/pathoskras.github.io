// From http://bl.ocks.org/nitaku/d79632a53187f8e92b15/dc1b22049eed0a4922bf093e85601de053b37dc5
// Generated by CoffeeScript 1.4.0
// https://observablehq.com/@d3/draw-me

const SWATCH_D = 22

const renderLine = d3.line().x(function (d) {
  return d[0]
}).y(function (d) {
  return d[1]
}).curve(d3.curveCatmullRom)
// https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529

type DrawingData = {
  id: number;
  image: string;
  lines: DrawnLine[];
  name: string;
  legend: string;
}

type Point = [number, number]

type DrawnLine = {
  points: Point[];
  color: string;
  width: number;
  elem ?: d3.Selection<SVGPathElement, DrawnLine, HTMLElement, any>;
}

class Drawer {
  backgroundImage: string;
  id: number;
  image: string;
  name: string;
  legend: string;

  linesLayer : d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  backgroundImageGroup :any;

  drawingData : {
    lines: DrawnLine[]
  } = {
    lines: []
  }

  activeLine : DrawnLine = null
  activeColor :string = '#333333'
  strokeWidth :number = 5

  constructor (data : DrawingData) {
    this.id = data.id
    this.drawingData.lines = data.lines
    this.name = data.name
    this.image = data.image
    this.legend = data.legend
  }

  getDrawingData () {
    return {
      id: this.id,
      image: this.image,
      name: this.name,
      legend: this.legend,
      lines: this.drawingData.lines
    }
  }

  getLines () : DrawnLine[] {
    // Strip out elements
    return this.drawingData.lines.map(d => {
      return {
        points: d.points,
        width: d.width,
        color: d.color
      }
    })
  }

  closeDrawer () {
    d3.select('#d3-drawer svg.canvas').remove()
  }

  printDrawer (elem: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
    const canvas = elem.append("svg")
      .attrs({
        class: 'canvas',
        viewBox: '0,0,1920,1080'
      })
    this.backgroundImageGroup = canvas.append('g').attrs({
      id: 'backgroundImageGroup'
    }).append('image').attrs({
      id: 'd3-background-image',
      width: 1920,
      height: 1080,
      href: `/images/${this.image}`
    })

    this.linesLayer = canvas.append('g').attrs({
      id: 'linesLayer'
    })

    this.paintLines()
  }

  showDrawer () {
    const drawer = this
    const canvas = d3.select('#d3-drawer')
      .append('svg')
      .attrs({
        class: 'canvas',
        viewBox: '0,0,1920,1080'
      })

    this.backgroundImageGroup = canvas.append('g').attrs({
      id: 'backgroundImageGroup'
    }).append('image').attrs({
      id: 'd3-background-image',
      width: 1920,
      height: 1080,
      href: `/images/${this.image}`
    })

    // const ui = canvas.append('g').attrs({
    //   id: 'drawer-ui'
    // })

    drawer.activateUI()

    this.linesLayer = canvas.append('g').attrs({
      id: 'linesLayer'
    })

    const drag = d3.drag()

    drag.on('start', function (this :d3.ContainerElement) {
      drawer.activeLine = {
        points: [],
        width: drawer.strokeWidth,
        color: drawer.activeColor
      }
      drawer.drawingData.lines.push(drawer.activeLine)
      return drawer.redraw(drawer.activeLine)
    })

    drag.on('drag', function (this :d3.ContainerElement) {
      drawer.activeLine.points.push(d3.mouse(this).map(d => Math.floor(d)) as [number, number])
      return drawer.redraw(drawer.activeLine)
    })

    drag.on('end', function () {
      if (drawer.activeLine.points.length === 0) {
        drawer.drawingData.lines.pop()
      } else {
        const rawPoints = drawer.activeLine.points.length
        drawer.activeLine.points = simplify(drawer.activeLine.points, 1.5, true)
        console.log(`Simplified line from ${rawPoints} points to ${drawer.activeLine.points.length} points`)
        drawer.redraw(drawer.activeLine)
      }
      drawer.activeLine = null
      return console.log(drawer.drawingData)
    })

    this.backgroundImageGroup.call(drag)

    this.paintLines()
  }

  /**
   * Erase & redraw the lines.
   */
  paintLines (drawingData ?: DrawingData) {
    const drawingLines :DrawnLine[] = drawingData ? drawingData.lines : this.drawingData.lines

    this.linesLayer.selectAll('.line').remove()
    const lines = this.linesLayer
      .selectAll('.line')
      .data(drawingLines)
      .enter()
      .append('path')
      .attrs((d, i, arr) => {
        d.elem = d3.select(arr[i])
        return {
          class: 'line',
          'stroke-width': d.width,
          stroke: d.color,
          d: renderLine(d.points)
        }
      })
      // .each(function (d: DrawnLine) {
      //   d.elem = d3.select(this)
      //   return d.elem
      // })

    return lines.exit().remove()
  }

  drawImage = function () {
    console.log('drawing image')
  }

  activateUI = function () {
    console.log('Activating UI')

    const drawer = this
    const ui = d3.select('#drawer-ui')
    ui.select('#imageTitle').text(drawer.name)

    const swatches = ui.selectAll('.swatch')
      .data(['#333333', '#ffffff', '#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'])
      .on('click', function (color) {
        setColor(color)
        return color
      })

    drawer.activeColor = $('#colorInput').val()
    drawer.strokeWidth = $('#lineWidthInput').val()

    d3.select('#colorInput').on('change', function (d) {
      const color = $('#colorInput').val()
      setColor(color)
    })

    function setColor (color) {
      drawer.activeColor = color
      $('#colorInput').val(color)
      ui.selectAll('.swatch').classed('active', false)
      swatches.each(function (d, i, arr) {
        if (d === drawer.activeColor) {
          return d3.select(arr[i]).classed('active', true)
        }
      })
    }

    d3.select('#lineWidthInput').on('change', function (d) {
      drawer.strokeWidth = $('#lineWidthInput').val()
      d3.select('#strokeWidth p').text(`${drawer.strokeWidth}px width`)
    })

    d3.select('.btn').on('click', function () {
      drawer.drawingData.lines = []
      return drawer.paintLines()
    })
  }

  redraw = function (specificLine ?: DrawnLine) {
    const drawer :Drawer = this
    const lines = drawer.linesLayer.selectAll<SVGLineElement, DrawnLine>('.line')
      .data(drawer.drawingData.lines)
      .enter()
      .append('path')
      .attrs((d, i, arr) => {
        d.elem = d3.select(arr[i])
        return {
          class: 'line',
          'stroke-width': d.width,
          stroke: d.color
        }
      })
      // .each(function (d, i, arr) {
      //   d.elem = d3.select(arr[i])
      //   return d.elem
      // })
    if (specificLine && specificLine.elem) {
      specificLine.elem.attrs({
        d: function (d) {
          return renderLine(d.points)
        }
      })
    } else {
      lines.attrs({
        d: function (d) {
          return renderLine(d.points)
        }
      })
    }
    return lines.exit().remove()
  }
}
