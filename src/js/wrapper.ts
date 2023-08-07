console.log('Loaded wrapper.ts')

declare let images: DrawingData[]

lazyLoadHiddenImages(images)

const md = new showdown.Converter({ openLinksInNewWindow: true })

const welcomeText = `##Welcome to the KRas Interactive Resource
#What is this Resource for?
This interactive resource is to help explain how changes in your cells can lead to cancer. It is specifically designed to assist patients with cancer caused by alterations in a cell messenger known as KRas. This specific alteration is known as G12C KRas and your doctor may have spoken
with you about this.

#Why have we created this Resource?
The purpose of this resource is to help you better understand your cancer, how it is caused and how specific treatments work. We hope this will increase your knowledge about your cancer and confidence in making decisions about your treatment.

#How does this Resource work?
This resource will be shown to you by your doctor or other clinical staff member.

The resource begins with some introductory information about KRas. This is followed by a video animation explaining KRas biology and what can go wrong in cancer. Following is a series of six images that your clinician can write on to explain your personal KRas story. This personalised information will be sent to you by email, so that you can view it at a later time, show friends and family, even your GP.

Finally, there is a list of terms and definitions and some useful links.

#Who created this Resource?
This interactive resource was designed and constructed at the Peter MacCallum Cancer Centre by David Ma, Bioinformatics Software Engineer. The text, video animation and images were created by Dr Maja Divjak, Biomedical Animator.
If you have queries about the design of this resource, please contact Dr Maja Divjak via [maja.divjak@petermac.org](mailto:maja.divjak@petermac.org?subject=KRAS%20Annotation) for further assistance. Please note that Dr Divjak cannot answer queries relating to your diagnosis or treatment. Please ask your doctor for assistance with this.
`
const introductionText = `##Introduction to KRas
#What is KRas?
Cells are the basic building blocks of our body, making up our tissues and organs. The body constantly makes new cells to help us grow, replace worn out tissue and heal injuries. Normally, cells multiply and die in an orderly way, so that each new cell replaces one lost.

There are special messengers that tell our cells how to do this. KRas is a messenger inside our cells that controls when cells divide. When cells are not dividing, KRas is switched off. When cells need to divide, KRas is switched on and when no longer needed, it is switched off again.

#What goes wrong with KRas?
Defects or faults can occur in the KRas messenger. One particular defect is known as a ‘G12C’ alteration. Your doctor may have mentioned this G12C alteration to you. The result of this defect is that KRas is always switched on. The end result is that affected cells keep dividing out of control, forming a mass or lump called a tumour.

#G12C KRas and cancer
* The G12C alteration is present in about 2% of all cancers (1).
* In the most commonly occurring form of lung cancer, 11% of patients have this G12C alteration (1).
* In bowel and pancreatic cancer, about 1-3% of patients have this G12C alteration (1, 2).

#Treating G12C KRas
Even though a significant number of lung and bowel cancer patients are affected by the G12C alteration, developing effective treatments has proven challenging. Recently however, a few treatments have been developed that keep the G12C KRas messenger switched off, without affecting normal KRas. These treatments have shown anti-cancer activity in clinical trials and could offer effective treatment options for patients who have previously had few choices (3).

#Clinical trials treating G12C KRas
At the Peter MacCallum Cancer Centre we are conducting clinical trials for G12C KRas patients to assess the effectiveness of treatments that keep the G12C KRas messenger switched off. Your clinician will explain how these clinical trials work and whether you are suitable to take part.`

const references = `#References
1. AACR Project GENIE: Powering Precision Medicine through an International Consortium. 2017. Cancer Discov. 7(8): 818-831
2. Andrew M. Waters and Channing J. Der. 2018. KRAS: The Critical Driver and Therapeutic Target for Pancreatic Cancer. Cold Spring Harb Perspect Med. 8(9): a031435
3. Jude Cannon, Karen Rex, Anne Y. Saiki et al. 2019. The clinical KRAS (G12C) inhibitor AMG 510 drives anti-tumour immunity. Nature. 575: 217-223
`
const termsText1 = `##Terms and definitions
#Bowel/bowel cancer:
The bowel is the intestines (like a tube) that run between the stomach and anus and is made up of the small bowel (small intestine) and the large bowel (colon and rectum). Bowel cancer is cancer in any part of the large bowel. It is sometimes known as colorectal cancer and might also be called colon cancer or rectal cancer, depending on where it starts. Cancer of the small bowel is very rare – it is called small bowel cancer or small intestine cancer.

#Cancer:
A disease where abnormal cells multiply without control and spread to other nearby body tissue
and/or organs. Cancer cells can also spread to other parts of the body through the bloodstream and
lymph systems.

#Cells:
* The smallest, living parts of the body. Cells work together to form or build the body.
* A human is made up of trillions of cells.
* Cells multiply and reproduce themselves to make sure a body stays working.
* Sometimes cells can be abnormal or damaged and these can be cancer cells.

#KRas:
A special messenger inside our cells that tells a cell when to divide.

#KRas, G12C:
A defective alteration in KRas that tells a cell to divide constantly.

#KRas, G12C treatments:
Anti-cancer treatments that target the G12C alteration in the KRas messenger, which is responsible for various forms of cancer. These treatments are currently being tested in clinical trials.
`

const termsText2 = `#Lung/lung cancer:
The lungs are a pair of breathing organs located in the chest, which transport oxygen into the blood and remove carbon dioxide. There is a left and right lung. Lung cancer occurs when abnormal cells develop in part of the lung.

#Pancreas/pancreatic cancer:

The pancreas is a long flattened organ located deep in the belly, behind the stomach. It is a vital part of the digestive system and important for controlling blood sugar levels. Pancreatic cancer occurs when abnormal cells develop in part of the pancreas.

#Useful Links:
Genetics Home Reference. Your Guide to Understanding Genetic Conditions [https://ghr.nlm.nih.gov/gene/KRAS](https://ghr.nlm.nih.gov/gene/KRAS)

Pathology Dictionary: KRAS [https://www.mypathologyreport.ca/kras/](https://www.mypathologyreport.ca/kras/)
`

function drawBannerPage(
  text: string,
  text2?: string
): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
  if (text2) text += text2

  const row = d3.select('#contentBox').append('div').classed('row', true)
  const result = row
    .append('div')
    .classed('col-sm-9 col-xs-12', true)
    .attr('id', 'bannerPageInner')
    .html(md.makeHtml(text))
  row
    .append('div')
    .classed('col-sm-3 hidden-xs', true)
    .classed('sideBanner', true)

  return result
}

function navbutton() {
  // console.log("Nav button clicked");
  $(".navigation").toggleClass("showMenu");
}

function welcome() {
  hideEverything()
  d3.select('ul a[href="#Welcome"]').classed('selected', true)
  $('#contentBox').html()

  drawBannerPage(welcomeText)
}

const drawers: Drawer[] = []
let drawer: Drawer = null

Object.keys(images).forEach(function (image) {
  const drawingData: DrawingData = images[image]
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
function hideEverything() {
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

function openScreen(id) {
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

function introduction() {
  hideEverything()
  d3.select('a[href="#Introduction"]').classed('selected', true)

  drawBannerPage(introductionText + '\n' + references)
}

function video() {
  hideEverything()
  d3.select('a[href="#Video"]').classed('selected', true)
  drawBannerPage('')

  $('#bannerPageInner')
    .html(md.makeHtml('##The role of KRas in cancer'))
    .append(
      `
    <p>The following video shows how KRas works inside your cells to control cell division and what can go wrong when KRas has a tiny defect.</p>

    <p>The proteins you can see are scientifically accurate and are actually shaped like that. However, in reality, the proteins are not coloured- we have used colour only to identify the different proteins.</p>

    <div class="iframe-container">
      <iframe id="kras-video" class="responsive-iframe" src="https://player.vimeo.com/video/506864719" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      <iframe id="kras-video-captions" class="hidden responsive-iframe" src="https://player.vimeo.com/video/516611480" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
    <p><a href="https://vimeo.com/506864719">The Role of KRas in Cancer</a> (<a href="https://vimeo.com/516611480">with captions</a>) from <a href="https://vimeo.com/majadivjak">Maja Divjak</a> on <a href="https://vimeo.com">Vimeo</a>.</p>`
    )

  d3.select('#bannerPageInner')
    .append('input')
    .attrs({
      type: 'button',
      value: 'Toggle Video Captions',
    })
    .on('click', function () {
      $('#kras-video-captions').toggleClass('hidden')
      $('#kras-video').toggleClass('hidden')
    })
}

function terms() {
  hideEverything()
  d3.select('a[href="#Terms"]').classed('selected', true)
  $('#contentBox').html()

  drawBannerPage(termsText1, termsText2)
  var div = d3.select('#cells').append('div').styles({
    float: 'right',
    'text-align': 'center',
    'max-width': '400px',
  })
  div
    .append('img')
    .attrs({
      src: '/images/torso.png',
    })
    .styles({
      height: '400px',
      'max-width': '100%',
      'object-fit': 'cover',
    })
  div
    .append('p')
    .text(
      'From the MSD Manual Consumer Version (Known as the Merck Manual in the US and Canada and the MSD Manual in the rest of the world), edited by Sandy Falk. Copyright 2022 by Merck Sharp & Dohme Corp., a subsidiary of Merck & Co., Inc., Kenilworth, NJ. Available at http://www.msdmanuals.com/home. Accessed Feb 2022.'
    )
    .styles({
      'font-weight': 100,
      'font-size': '10px',
    })
  // pancreaspancreaticcancer
  // Pancreas_and_nearby_organs.jpg
}

function email() {
  hideEverything()
  d3.select('a[href="#Email"]').classed('selected', true)
  d3.select('#emailForm').classed('hidden', false)
}

function toggleImageLinks() {
  // $('li.image').toggleClass("hidden")
  $('li.image').removeClass('hidden')
  hideEverything()
  drawBannerPage('')

  d3.select('#bannerPageInner').append('h1').text('Images')

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
      thumb
        .append('td')
        .append('a')
        .attrs({
          href: `#${data.image}`,
          onclick: `openScreen(${i})`,
        })
        .append('img')
        .attrs({
          // src: `/images/${data.image}`,
          src: `${data.thumbnail}`,
          class: 'thumbnail',
        })
      const desc = thumb.append('td')
      desc
        .append('h3')
        .style('margin-top', 0)
        .append('a')
        .attrs({
          href: `#${data.image}`,
          onclick: `openScreen(${i})`,
        })
        .text(data.name)
      desc.append('p').text(data.legend)
    })
}

let pageCount = 1

function drawHeader(
  elem: d3.Selection<HTMLElement, unknown, HTMLElement, any>
) {
  const header = elem.insert('div').classed('printHeader row', true)

  header.append('div').classed('col-xs-2', true).append('img').attrs({
    class: 'headerLogo',
    src: '/images/petermac_logo.png',
  })

  header
    .append('div')
    .classed('col-xs-8', true)
    .styles({
      'text-align': 'center',
    })
    .append('h1')
    .styles({
      'text-align': 'center',
    })
    .text('Interactive KRas Resource')

  header
    .append('div')
    .classed('col-xs-2', true)
    .styles({
      'text-align': 'right',
    })
    .append('h4')
    .text(`Page ${pageCount++} of 9`)
}

function printVersion() {
  console.log('Print mode')

  // Clean up web version things
  $('#wrapper').toggleClass('pdfMode')
  $('#bannerPageInner').remove()
  $('.navigation').remove()

  // Front page
  const frontPage = d3
    .select('#contentBox')
    .append('div')
    .classed('printPage', true)

  drawHeader(frontPage)

  let row = frontPage.append('div').classed('row', true)
  row.append('div').classed('col-xs-6', true).html(md.makeHtml(welcomeText))

  row
    .append('div')
    .classed('col-xs-6', true)
    .html(md.makeHtml(introductionText))

  // Video Page
  const videoPage = d3
    .select('#contentBox')
    .append('div')
    .classed('printPage', true)

  drawHeader(videoPage)

  row = videoPage.append('div').classed('row', true)
  row
    .append('div')
    .classed('col-xs-6', true)
    .html(
      `<a href="https://vimeo.com/506864719" rel="noopener noreferrer" target="_blank"><h1 style="font-size:16px;">The Role of KRas in Cancer</h1>
    <img src="/images/VimeoPreview.png" style="width: 100%;" alt=""><p style="font-size:20px;">https://vimeo.com/506864719</p></a>`
    )
    .style('text-align', 'center')
  row
    .append('div')
    .classed('col-xs-6', true)
    .html(
      `<a href="https://vimeo.com/516611480" rel="noopener noreferrer" target="_blank"><h1 style="font-size:16px;">The Role of KRas in Cancer with captions</h1>
    <img src="/images/VimeoPreview.png" style="width: 100%;" alt=""><p style="font-size:20px;">https://vimeo.com/516611480</p></a>`
    )
    .style('text-align', 'center')

  // Terms and Definitions Page
  const nextPage = d3
    .select('#contentBox')
    .append('div')
    .classed('printPage', true)

  drawHeader(nextPage)

  row = nextPage.append('div').classed('row', true)
  row.append('div').classed('col-xs-6', true).html(md.makeHtml(termsText1))

  const col2 = row.append('div').classed('col-xs-6', true)
  col2
    .append('img')
    .attrs({
      src: '/images/torso.png',
    })
    .styles({
      'margin-top': '5px',
      height: '250px',
      float: 'right',
    })
  col2.append('div').html(md.makeHtml(termsText2))

  col2.append('div').html(md.makeHtml(references))

  d3.select('#d3-drawer').classed('hidden', false)
  d3.select('#drawer-ui').remove()

  const box = d3.select('#d3-drawer')
  drawers.forEach((drawer) => {
    const div = box.append('div').classed('printPage', true)
    drawHeader(div)
    div.append('h1').text(drawer.name)
    drawer.printDrawer(div)
    div.append('p').text(drawer.legend)
  })
}

function lazyLoadHiddenImages(images: DrawingData[]) {
  try {
    console.log('Loading images in the background')

    const div = d3.select('#hiddenImages')
    div
      .append('div')
      .selectAll('img')
      .data(images)
      .enter()
      .append('img')
      .attrs({
        src: (d) => d.thumbnail,
      })
    if (window.location.href.indexOf('pathos.co') > -1) {
      console.log('Load smugmug images on web version')
      div
        .append('div')
        .selectAll('img')
        .data(images)
        .enter()
        .append('img')
        .attrs({
          src: (d) => d.smugmug,
        })
    } else {
      console.log('No need to do this for the print version')
    }

    div
      .append('div')
      .selectAll('img')
      .data(images)
      .enter()
      .append('img')
      .attrs({
        src: (d) => d.large,
      })
  } catch (e) {
    console.error(e)
  }
}

welcome()

if (window.location.hash === '#printVersion') {
  printVersion()
}
