console.log('Loaded wrapper.ts')

declare let images: DrawingData[]

const md = new showdown.Converter({ openLinksInNewWindow: true })

const welcomeText = `##Welcome to the KRas Interactive Resource
#What is this Resource for?
This interactive resource is to help explain how changes in your cells can lead to cancer. It is specifically designed to assist those patients with cancer caused by alterations in a cell messenger known as KRas. This specific alteration is known as G12C KRas and your doctor may have spoken
with you about this.

#Why have we Created this Resource?
The purpose of this resource is to help patients better understand their particular cancer and how it is caused and how specific treatments work. We hope this will increase patient knowledge and confidence in making decisions about their treatment.

#How does this Resource Work?
This resource will be shown to you by your doctor or other clinical staff member.

The resource begins with some introductory information about KRas. This is followed by a video animation explaining KRas biology and what can go wrong in cancer. There is also a model, which shows how a treatment called AMG510 fits into altered KRas. Following is a series of six images that your clinician can write on to explain your personal KRas story. This personalised information will be sent to you by email, so that you can view it at a later time, show friends and family, even your GP.

Finally, there is a list of terms and definitions and some useful links.

#Who Created this Resource?
This interactive resource was designed and constructed at the Peter MacCallum Cancer Centre by David Ma, Bioinformatics Software Engineer. The text, video animation and images were created by Dr Maja Divjak, Biomedical Animator.
If you have queries about the design of this resource, please contact Dr Maja Divjak via [maja.divjak@petermac.org](mailto:maja.divjak@petermac.org?subject=KRAS%20Annotation) for further assistance. Please note that Dr Divjak cannot answer queries relating to your diagnosis or treatment. Please ask your doctor for assistance with this.
`
const introductionText = `##Introduction to KRas
#What is KRas?
Cells are the basic building blocks of our body, making up our tissues and organs. The body constantly makes new cells to help us grow, replace worn out tissue and heal injuries. Normally, cells multiply and die in an orderly way, so that each new cell replaces one lost. There are special messengers that tell our cells how to do this. KRas is a messenger inside our cells that controls when cells multiply. When cells are not multiplying, KRas is switched off. When cells need to multiply, KRas is switched on and when no longer needed, it is switched off again.

#What Goes Wrong with KRas?
Alterations can occur in the KRas messenger. One particular alteration is known as a ‘G12C’ alteration. Your doctor may have mentioned this G12C alteration to you. The result of this alteration is that KRas is always switched on. The end result is that affected cells keep multiplying out of control, forming a mass or lump called a tumour.

#G12C KRas and Cancer
* The G12C alteration is present in about 2% of all cancers (1).
* In the most commonly occurring form of lung cancer, 11% of patients have this G12C alteration (1).
* In bowel and pancreatic cancer, about 1-3% of patients have this G12C alteration (1, 2).

#Treating G12C KRas
Even though a significant number of lung and bowel cancer patients are affected by the G12C alteration, developing effective treatments has proven challenging. Recently however, a couple of treatments have been developed that keep the G12C KRas messenger switched off, without affecting normal KRas. These treatments, including AMG 510, have shown anti-cancer activity in clinical trials and could offer effective treatment options for patients who have previously had few choices (3).

#Clinical Trials Treating G12C KRas
At the Peter MacCallum Cancer Centre we are conducting clinical trials for G12C KRas patients to assess the effectiveness of treatments such as AMG 510. Your clinician will explain how these clinical trials work and whether you are suitable to take part.
`
const references = `#References:
1. AACR Project GENIE: Powering Precision Medicine through an International Consortium. 2017. Cancer Discov. 7(8): 818-831
2. Andrew M. Waters and Channing J. Der. 2018. KRAS: The Critical Driver and Therapeutic Target for Pancreatic Cancer. Cold Spring Harb Perspect Med. 8(9): a031435
3. Jude Cannon, Karen Rex, Anne Y. Saiki et al. 2019. The clinical KRAS (G12C) inhibitor AMG 510 drives anti-tumour immunity. Nature. 575: 217-223
`
const termsText = `##Terms and Definitions:
#AMG 510:
An experimental anti-cancer drug. It targets the G12C alteration in the KRas messenger, which is responsible for various forms of cancer

#Bowel/bowel cancer:
The bowel is the intestines (like a tube) that run between the stomach and anus and is made up of the small bowel (small intestine) and the large bowel (colon and rectum). Bowel cancer is cancer in any part of the large bowel. It is sometimes known as colorectal cancer and might also be called colon cancer or rectal cancer, depending on where it starts. Cancer of the small bowel is very rare – it is called small bowel cancer or small intestine cancer.

#Cancer:
A disease where abnormal cells multiply without control and spread to other nearby body tissue
and/or organs. Cancer cells can also spread to other parts of the body through the bloodstream and
lymph systems

#Cells:
* The smallest, living parts of the body. Cells work together to form or build the body
* A human is made up of millions of cells
* Cells multiply and reproduce themselves to make sure a body stays working
* Sometimes cells can be abnormal or damaged and these can be cancer cells

#KRas:
A special messenger inside our cells that tells a cell when to multiply

#KRas, G12C:
A defective alteration in KRas that tells a cell to multiply constantly

#Lung/lung cancer:
The lungs are a pair of breathing organs located in the chest, which transport oxygen into the blood and remove carbon dioxide. There is a left and right lung. Lung cancer occurs when abnormal cells develop in part of the lung.

#Pancreas/pancreatic cancer:

The pancreas is a long flattened gland located deep in the belly. A vital part of the digestive system and critical controller of blood sugar levels. Pancreatic cancer occurs when abnormal cells develop in part of the pancreas

#Useful Links:
Genetics Home Reference. Your Guide to Understanding Genetic Conditions [https://ghr.nlm.nih.gov/gene/KRAS](https://ghr.nlm.nih.gov/gene/KRAS)

Pathology Dictionary: KRAS [https://www.mypathologyreport.ca/kras/](https://www.mypathologyreport.ca/kras/)
`

function drawBannerPage (text: string) : d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
  const row = d3.select('#contentBox').append('div').classed('row', true)
  const result = row.append('div')
    .classed('col-xs-9', true)
    .attr('id', 'bannerPageInner')
    .html(md.makeHtml(text))
  row.append('div')
    .classed('col-xs-3', true)
    .classed('sideBanner', true)

  return result
}

function welcome () {
  hideEverything()
  d3.select('ul a[href="#Welcome"]').classed('selected', true)
  $('#contentBox').html()

  drawBannerPage(welcomeText)
}

const drawers :Drawer[] = []
let drawer :Drawer = null

Object.keys(images).forEach(function (image) {
  const drawingData :DrawingData = images[image]
  const drawer = new Drawer(drawingData)
  drawers.push(drawer)
})

/**
 * Hide any screen that is showing
 * Hide all elements
 *
 * Close any open drawers and save lines
 *
 */
function hideEverything () {
  d3.selectAll('ul li a').classed('selected', false)
  $('#contentBox').html('')
  d3.selectAll('.bigText').classed('hidden', true)
  d3.selectAll('.drawer').classed('hidden', true)
  d3.select('#noteBox').classed('hidden', true)
  d3.select('#emailForm').classed('hidden', true)
  // d3.select('#imageTitle').classed('hidden', true)

  if (drawer) {
    const lineData = drawers.reduce((acc, drawer, index) => {
      acc[index] = drawer.getLines()
      return acc
    }, [])

    $('#lineData').val(JSON.stringify(lineData))

    drawer.closeDrawer()
  } else {
    console.log('Not on a screen to save..?')
  }
}

function openScreen (id) {
  hideEverything()
  d3.select(`a[onclick="openScreen(${id})"]`).classed('selected', true)
  d3.select('#noteBox').classed('hidden', false)

  drawer = drawers[id]
  drawer.showDrawer()

  d3.select('.drawer').classed('hidden', false)

  const div = d3.select('#contentBox').append('div')

  d3.select(`#text-${id}`).classed('hidden', false)

  if ($(`#text-${id}`).val() === '') {
    d3.select(`#text-${id}`).text(drawer.getDrawingData().legend)
  }
}

function introduction () {
  hideEverything()
  d3.select('a[href="#Introduction"]').classed('selected', true)

  drawBannerPage(introductionText + '\n' + references)
}

function video () {
  hideEverything()
  d3.select('a[href="#Video"]').classed('selected', true)
  drawBannerPage('')

  $('#bannerPageInner')
    .html(md.makeHtml('##The Role of KRas in Cancer'))
    .append('<div class="iframe-container"><iframe class="responsive-iframe" src="https://www.youtube-nocookie.com/embed/pD5q4TlZW-M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
    .append(md.makeHtml(`#Link to Protein Databank:
[Mutant KRas interacting with AMG 510](https://www.rcsb.org/pdb/explore/jmol.do?structureId=6oim&bionumber=1&jmolMode=HTML5)
`))
}

function terms () {
  hideEverything()
  d3.select('a[href="#Terms"]').classed('selected', true)
  $('#contentBox').html()

  drawBannerPage(termsText)
}

function email () {
  hideEverything()
  d3.select('a[href="#Email"]').classed('selected', true)
  d3.select('#emailForm').classed('hidden', false)
}

function toggleImageLinks () {
  // $('li.image').toggleClass("hidden")
  $('li.image').removeClass('hidden')
  hideEverything()
  drawBannerPage('')

  d3.select('#bannerPageInner')
    .append('h1')
    .text('Images')

  d3.select('#bannerPageInner')
    .append('table')
    .selectAll('.imageThumbDiv')
    .data(Object.keys(images))
    .enter()
    .append('tr')
    .classed('imageThumbDiv', true)
    .each((d, i, arr) => {
      const data = images[d]
      const thumb = d3.select(arr[i])
      thumb.append('td')
        .append('a').attrs({
          href: `#${data.image}`,
          onclick: `openScreen(${i + 1})`
        })
        .append('img').attrs({
          src: `/images/${data.image}`,
          class: 'thumbnail'
        })
      const desc = thumb.append('td')
      desc.append('h3').text(data.name)
      desc.append('p').text(data.legend)
    })
}

let pageCount = 1

function drawHeader (elem :d3.Selection<HTMLElement, unknown, HTMLElement, any>) {
  const header = elem.insert('div').classed('printHeader row', true)

  header.append('div').classed('col-xs-3', true)
    .append('img').attrs({
      class: 'headerLogo',
      src: '/images/petermac_logo.png'
    })

  header.append('div')
    .classed('col-xs-6', true)
    .styles({
      'text-align': 'center'
    })
    .append('h1')
    .styles({
      'text-align': 'center'
    })
    .text('Interactive KRas Resource')

  header.append('div')
    .classed('col-xs-3', true)
    .styles({
      'text-align': 'right'
    })
    .append('h4')
    .text(`Page ${pageCount++} of 8`)
}

function printVersion () {
  console.log('Print mode')

  $('#wrapper').toggleClass('pdfMode')
  $('#bannerPageInner').remove()

  const frontPage = d3.select('#contentBox')
    .append('div').classed('printPage', true)

  drawHeader(frontPage)

  let row = frontPage.append('div').classed('row', true)
  row.append('div').classed('col-xs-6', true)
    .html(md.makeHtml(welcomeText))

  row.append('div').classed('col-xs-6', true)
    .html(md.makeHtml(introductionText))

  const nextPage = d3.select('#contentBox')
    .append('div').classed('printPage', true)

  drawHeader(nextPage)

  row = nextPage.append('div').classed('row', true)
  row.append('div').classed('col-xs-6', true)
    .html(md.makeHtml(termsText))

  row.append('div').classed('col-xs-6', true)
    .html(md.makeHtml(references))

  d3.select('#d3-drawer').classed('hidden', false)
  d3.select('#drawer-ui').remove()

  const box = d3.select('#d3-drawer')
  drawers.forEach(drawer => {
    const div = box.append('div').classed('printPage', true)
    drawHeader(div)
    div.append('h1').text(drawer.name)
    drawer.printDrawer(div)
    div.append('p').text(drawer.legend)
  })
}

welcome()
