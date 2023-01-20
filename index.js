const input = document.getElementById("image-selector");
const ethpredict = document.getElementById("predict-button1")
const genpredict = document.getElementById("predict-button2")
const agepredict = document.getElementById("predict-button3")
let imagesArray = [];
let tensorArray = [];
let tensorBatch = [];
let zercount = 0;
let onecount = 0;
let twocount = 0;
let threecount = 0;
let mcount = 0;
let fcount = 0;
let ccount = 0;
let acount = 0;
let scount = 0;
input.addEventListener("change", async () => {
    const files = input.files
    const loadPromises = []
    for(let i=0; i<files.length; i++) {
        const file = files[i]
        const reader = new FileReader();
        const loadPromise = new Promise(resolve => {
        reader.onload = function(){
            const imgg = new Image();
            imgg.src = reader.result
            resolve(imgg)
         }
        })
        loadPromises.push(loadPromise)
        reader.readAsDataURL(file);
    }

    imagesArray = await Promise.all(loadPromises)

    for(let i=0; i<imagesArray.length; i++){
        const imge = tf.browser.fromPixels(imagesArray[i]);
        const image = tf.image.resizeBilinear(imge,[224,224]).div(tf.scalar(255))
        //const rimage = image.expandDims();
        tensorArray.push(image);
         }
        
        console.log(imagesArray)
        console.log(imagesArray.length)
        console.log(tensorArray)

        tensorBatch = tf.stack(tensorArray,0)

})

ethpredict.addEventListener("click", async () => {
    const scrollinfo = document.getElementById("scroll-text")
    scrollinfo.innerHTML = "Please wait a moment and scroll down for results."


    const model = tf.loadLayersModel('jsmodel1/model.json').then(async model => {
        const predictions = await model.predict(tensorBatch)
       

        const predictionsArray = tf.unstack(predictions);
        console.log(predictionsArray[0].dataSync())
        console.log(predictionsArray[1].dataSync())
        console.log(predictionsArray[2].dataSync())
        const predictionsMax = predictionsArray.map(tensor => tf.argMax(tensor, -1))
        const regularArrayPromise = await Promise.all(predictionsMax.map(tensor => tensor.data()));
        console.log(regularArrayPromise)
        

        for(let i=0; i<regularArrayPromise.length; i++){
            if(regularArrayPromise[i] == 0){
                zercount = zercount + 1;
            }
            if(regularArrayPromise[i] == 1){
                onecount = onecount + 1;
            }
            if(regularArrayPromise[i] == 2){
                twocount = twocount + 1;
            }
            if(regularArrayPromise[i] == 3){
                threecount = threecount + 1;
            }
        }

        const answerstring = "Your dataset contains <br> "+zercount+" asian people <br> "+onecount+" black people <br> "+twocount+" indian people <br> "+threecount+" white people."
        
        const answer = document.getElementById("eth-count")

        answer.innerHTML = answerstring;


        });
})

genpredict.addEventListener("click", async () => {
    const scrollinfo = document.getElementById("scroll-text")
    scrollinfo.innerHTML = "Please wait a moment and scroll down for results."


    const model = tf.loadLayersModel('jsmodel1/genmodel/genmodel.json').then(async model => {
        const predictions = await model.predict(tensorBatch)
       

        const predictionsArray = tf.unstack(predictions);
        console.log(predictionsArray[0].dataSync())
        console.log(predictionsArray[1].dataSync())
        console.log(predictionsArray[2].dataSync())
        const predictionsMax = predictionsArray.map(tensor => tf.argMax(tensor, -1))
        const regularArrayPromise = await Promise.all(predictionsMax.map(tensor => tensor.data()));
        console.log(regularArrayPromise)
        

        for(let i=0; i<regularArrayPromise.length; i++){
            if(regularArrayPromise[i] == 0){
                fcount = fcount + 1;
            }
            if(regularArrayPromise[i] == 1){
                mcount = mcount + 1;
            }
        }

        const answerstring = "Your dataset contains <br> "+mcount+" men <br> "+fcount+" women <br> "
        
        const answer = document.getElementById("eth-count")

        answer.innerHTML = answerstring;


        });
})

agepredict.addEventListener("click", async () => {
    const scrollinfo = document.getElementById("scroll-text")
    scrollinfo.innerHTML = "Please wait a moment and scroll down for results."


    const model = tf.loadLayersModel('jsmodel1/agemodel/agemodel.json').then(async model => {
        const predictions = await model.predict(tensorBatch)
       

        const predictionsArray = tf.unstack(predictions);
        console.log(predictionsArray[0].dataSync())
        console.log(predictionsArray[1].dataSync())
        console.log(predictionsArray[2].dataSync())
        const predictionsMax = predictionsArray.map(tensor => tf.argMax(tensor, -1))
        const regularArrayPromise = await Promise.all(predictionsMax.map(tensor => tensor.data()));
        console.log(regularArrayPromise)
        

        for(let i=0; i<regularArrayPromise.length; i++){
            if(regularArrayPromise[i] == 0){
                ccount = ccount + 1;
            }
            if(regularArrayPromise[i] == 1){
                acount = acount + 1;
            }
            if(regularArrayPromise[i] == 2){
                scount = scount + 1;
            }
        }

        const answerstring = "Your dataset contains <br> "+ccount+" chilren <br> "+acount+" adults <br> "+scount+" seniors <br>"
        
        const answer = document.getElementById("eth-count")

        answer.innerHTML = answerstring;


        });
})



