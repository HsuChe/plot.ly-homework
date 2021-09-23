
// Initialize the app
let init = () => {
    d3Initialize()
}

let d3Initialize = () => {
    // Read in the json file and set the json to data
    d3.json("static/js/data/samples.json").then(data => {
        // Generate the drop down menu options
        dropDownGen(data.names)
        // create a listener for changes
        d3.selectAll("#selDataset").on("change", optionData(data));
    })
};

let dropDownGen = (sampleNames) => {
    // Generate all the options for the dropdown menu
    sampleNames.map(value => {
        option = d3.select("#selDataset").append("option");
        option.attr("value", value).text(value)
    });
};

let optionData = (data) => {
    // Get current option selected
    let curOption = d3.select('#selDataset').property("value");
    metadata = data.metadata.filter(testSubject => testSubject.id == curOption);
    samples = data.samples.filter(testSubject => testSubject.id == curOption);
    label_ids = samples[0].otu_ids;
    label_labels = samples[0].otu_labels;
    sample_values = samples[0].sample_values;
    // Verifying filter and variables
    console.log(samples);
    console.log(metadata);
    console.log(label_ids);
    console.log(label_labels);
    console.log(sample_values);
};

let metadataPanel = () => {

}

init()