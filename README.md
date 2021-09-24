<h3 align="center">Ploting Belly Button Bacteria</h3>

<p align="center">
     Abstract: 
     The human belly button contains various different bactreria and the unique biome can potentially produce various health effects on the human body. We will be breaking down the bacteria found in each participants and graph their frequency as well as seeing the effect of washing belly buttons have on the bacteria.
    <br />
    <a href="https://github.com/HsuChe/plot.ly-homework"><strong>Project Github URL »</strong></a>
    <br />
    <br />
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

![hero image](https://github.com/HsuChe/python-api-challenge/blob/69e9ff67cfc7c09cf6aacde6f124853f4e0c2b02/Images/tree-832079_1280.jpg)

Data were collected from the belly button samples extracted from the participants and the bacteria id and population is documented in a JSON file. We will be reading from the JSON file to construct the sample collected from each individual

Features of the dataset:

* The dataset composes information for the test subjects with their unique ID and the corresponding sample.

  * ID: **this is the primary key we will be using to update the website, this is the unique ID for each participant.**
  * Samples: **data is collected through the samples provided by each participant, these samples will have ID of each bacteria, the name of the bacteria, and the total volume of each bacteria in the sample**
  
## Loading the data

The first thing we did was to load the JSON data into the html and javascript templates provided.

* first we will use D3 to read the JSON into the app

  ```sh
  let d3Initialize = () => {
      d3.json("static/js/data/samples.json").then(data => {
          dropDownGen(data.names)
          chartBuildingInit('940')
      })
  }
  ```

We will be able to build the initial charts for the first patient in the JSON, patient ID 940, and we will load the dropdown menu all the unique ID of the participants. 

We will generate the dropdown menu based on the participants

* We will sample the list of unique ID from the JSON

  ```sh
    let dropDownGen = (sampleNames) => {
        sampleName.map(value => {
            optio = d3.select("#selDataset").append("option");
            option.attr("value",value).text(value)
        });
    };
  ```

### Create a listener for changes to the dropdown menu

We will create an event listener for the dropdown and identify the specific participant ID that we want to build charts for. 

* We will first create the function to pass into the html to activate on changes.

  ```sh
  let optionChanged = (curOption) => {
      chartBuildnit(curOption)
  }
  ```
  ```sh
    <select id = "selDataset" onchange = "optionChanged(this.value)"></select>
  ```

When the dropdown menu is changed, we will pass the current selected ID to the charting function.

* We will pull new information from the JSON whenver a change happens on the dropdown menu.

  ```sh
    let chartBuildinit = curOption => {
        d3.json("static/js/data/samples.json").then(data => {
            metadata = data.metadata.filter(testSubject => testSubject.id == curOption);
            samples = data.samples.filter(testSubject => testSubject.id == curOption);
            labelids = samples[0].otu_ids;
            labels = samples[0].otu_labels;
            sampleValues = sample[0].sample_values;

            metadataPanel(metadata);
            graphOtu(sampleValues, labelIds, labels, curOption);
            graphTraceGaugeChart(metadata, curOption);
        })
    }
  ```
* Now we will build out each specific graphs using plotly and creating new elements. 

  ```sh
    let metadtaPanel = (metadata) => {
        //reset the container
        d3.select('#sample-metadata').selectAll('h6').remove()
        let metaDataPanel = d3.select('#sample-metadata');
        Object.entries(metadata[0]).forEach(([key, value]) => {
            metaDataPanel.append('h6').text(
                `${key.toUpperCase()}: ${value}`
            )
        });
    }
  ```

  ```sh
    let graphOtu = (sampleValues, labelIds, labels, curOption) => {
        let topValues = sampleValues.slice(0,10).reverse();
        let topLabelsId = labelIds.slice(0,10).reverse();
        graphTopOtu(topValues, topLabelsid, curOption)
        graphBubbleChart(topValues, topLabelsId, labels, curOption)
    }
  ```

  ```sh
    let graphTopOtu = {values, labelid, curOption} => {
        let traceTop = {
            x: values,
            y: labelid.map(id => `OTU ${id}`),
            type:'bar',
            orientation: 'h',
            maker: {
                color:'red'
            }
        };
        let layout = {
            title: {
                text: `<b> Top 10 OTU for ID ${curOption} </b>`,
                font: {
                    size: 16
                },
                height: 1000,
                width: 800
            }
        };
        Plotly.newPlot('bar', [traceTop], layout)
    };
  ```

```sh
    let graphBubbleChart = (values, labelid, labels, curOption) => {
        // setup the x and y intercepts to be graphed
        let traceCir = {
            x: labelid,
            y: values,
            text: labels,
            mode:'markers',
            marker: {
                size: values,
                color:labelid,
            }};
        // Setting titles and layout parameters
        let layout = {
            title: {
                text: `<b> Bacteria Cultures for ID ${curOption}</b>`,
                font: {
                    size: 16
                },
                height: 1000,
                width: 800
            },
            xaxis: {
                title: {
                    text: `<b> OTU ID </b>`,
                    font: {
                        size: 16,
                    },
                    height: 1000,
                    width: 800
                }
            }
        };
        Plotly.newPlot('bubble', [traceCir], layout);
        };

        let graphTraceGaugeChart = (metadata, curOption) => {
            let traceGauge = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: metadata[0].wfreq,
                    title: { text: `<b> Belly Button Washing Frequency ID ${(curOption)}</b>` },
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                        axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
                        steps: [
                            { range: [0, 1], color: 'rgb(217, 216, 185)' },
                            { range: [1, 2], color: 'rgb(95, 161, 159)' },
                            { range: [2, 3], color: 'rgb(70, 150, 150)' },
                            { range: [3, 4], color: 'rgb(68, 140, 146)' },
                            { range: [4, 5], color: 'rgb(25, 114, 127)' },
                            { range: [5, 6], color: 'rgb(15, 90, 110)' },
                            { range: [6, 7], color: 'rgb(7, 95, 109)'},
                            { range: [7, 8], color: 'rgb(1, 81, 108)' },
                            { range: [8, 9], color: 'rgb(0, 53, 85)' }
                        ],
                        threshold: {
                            line: { color: "red", width: 4 },
                            thickness: 0.75,
                            value: 9
                        }
                    }
                }
            ];

            let layoutGauge = {
                width: 600,
                height: 500,
                margin: {
                    t:0, 
                    b:0
                },
            }
            Plotly.newPlot('gauge', traceGauge, layoutGauge)
        };
```
