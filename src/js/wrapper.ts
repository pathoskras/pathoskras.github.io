console.log('Loaded wrapper.ts')

type Point = [number, number]
type Line = {
  points : Point[];
  color : string;
}
type KrasImage = {
  id : number;
  image : string;
  lines : Line[];
  name : string;
}
declare let images: KrasImage[]

const md = new showdown.Converter({ openLinksInNewWindow: true })

function welcome () {
  hideEverything()

  $('#contentBox').html(md.makeHtml(`##Welcome to the KRas Interactive Resource

#What is this Resource for?
This interactive resource is to help explain how changes in your cell messaging systems can lead to
cancer. It is specifically designed to assist those patients with cancer caused by alterations in a cell
messenger known as KRas. This specific alteration is known as G12C KRas and your doctor may have
spoken with you about this.

#Why have we created this Resource?
The purpose of this resource is to help patients better understand their particular cancer and how it
is caused and how specific treatments work. We hope this will increase patient knowledge and
confidence in making decisions about their treatment.

#How does this Resource Work?
This resource will be shown to you by your doctor or other clinical staff member.

The resource begins with some introductory information about KRas. This is followed by a video
animation explaining KRas biology and what can go wrong in cancer. There is also a model, which
shows how a treatment called AMG510 fits into altered KRas. Following is a series of six images that
your clinician can write on to explain your personal KRas story. This personalized information will be
sent to you by email, so that you can view it at a later time, show friends and family, even your GP.

Finally, there is a list of terms and definitions and some useful links.

#Who can I contact for further information about the Resource?
Please contact Dr Maja Divjak ([maja.divjak@petermac.org](mailto:maja.divjak@petermac.org?subject=KRAS%20Annotation)) for further assistance.

#The Role of K-Ras in Cancer video:`))
    .append('<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pD5q4TlZW-M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    .append('<br>')
}

let currentScreen = null
welcome()

function hideEverything () {
  $('#contentBox').html('')
  d3.selectAll('.bigText').classed('hidden', true)
  d3.selectAll('.drawer').classed('hidden', true)
  d3.select('#noteBox').classed('hidden', true)
  d3.select('#emailForm').classed('hidden', true)
  d3.select('#imageTitle').classed('hidden', true)

  if (currentScreen) {
    console.log('saving data for ' + currentScreen)
    console.log(drawingData.lines)
    images[currentScreen].lines = drawingData.lines.map(d => {
      return {
        points: d.points,
        color: d.color
      }
    })

    $('#lineData').val(JSON.stringify(images))
  } else {
    console.log('Not on a screen to save..?')
  }
}

function openScreen (id) {
  hideEverything()
  d3.select('#noteBox').classed('hidden', false)
  const blob = drawingData = images[id]
  const image = blob.image
  currentScreen = id

  d3.select('#imageTitle').classed('hidden', false).text(blob.name)

  paint(drawingData)

  d3.select('.drawer').classed('hidden', false)
  d3.select('#d3-background-image').attr('src', `/images/${image}`)

  const div = d3.select('#contentBox').append('div')
  div.append('img').attrs({
    class: 'bigImage',
    src: `/images/${image}`
  })
  const div2 = d3.select('#contentBox').append('div')
  d3.select(`#text-${id}`).classed('hidden', false)
}

function email () {
  hideEverything()
  d3.select('#emailForm').classed('hidden', false)
}
