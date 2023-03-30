var colorWell;
var defaultColor = chroma.random();
var formHarmonyMode;
var harmonyMode = document.querySelector("#harmonyMode").value;
console.log("start " + harmonyMode)
var numberHue = 3;
var harmonyAngle = 120;

//these variables control if saturation and lightness are changed. hue is always changed, according to harmonyMode
var changeSat = true;
var changeLightness = true;

window.addEventListener("load", startup, false);

function startup() {
    //event to trigger on change in harmony mode drop-down
    let select = document.querySelector("#harmonyMode");
    select.addEventListener("change", updateAll);

    // setting color input, event to change swatches on input or change color input
    colorWell = document.querySelector("#colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", updateAll, false);
    colorWell.addEventListener("change", updateAll, false);
    colorWell.select();

    //button to change to random color
    random = document.querySelector("#randomColor");
    random.addEventListener("click", updateRandom)

    updateFirst();

    //Setting up radio buttons:
    let toggleLightness = document.querySelector("#lightnessSwitch");
    toggleLightness.addEventListener('change', function () {
        if (this.checked) {
            changeLightness = true;
        } else {
            changeLightness = false;
        }
    });
    toggleLightness.addEventListener('change', updateAll)

    let toggleSaturation = document.querySelector("#saturationSwitch");
    toggleSaturation.addEventListener('change', function () {
        if (this.checked) {
            changeSat = true;
        } else {
            changeSat = false;
        }
    });
    toggleSaturation.addEventListener('change', updateAll)

}

function setHarmonyMode(harmonyMode) {
    harmonyMode = document.querySelector("#harmonyMode").value;
    console.log(harmonyMode);
    if (harmonyMode) {
        switch (harmonyMode) {
            case "complementary":
                numberHue = 2;
                harmonyAngle = 180;
                break;
            case "triadic":
                numberHue = 3;
                harmonyAngle = 120;
                break;
            case "triadicComplementary":
                numberHue = 3;
                harmonyAngle = 0; //special case in getHue
                break;
            case "doubleComplementary":
                numberHue = 4;
                harmonyAngle = 90;
            case "tetradic":
                numberHue = 4;
                harmonyAngle = 0; //special case in getHue
                break;
            case "analogous":
                harmonyAngle = 30;
                numberHue = 4;
                break;
            case "neutral":
                harmonyAngle = 15;
                numberHue = 4;
                break;
        }
    }
}

function updateFirst(event) {
    // runs on load of page

    setHarmonyMode(harmonyMode);
    setLayout(harmonyMode);

    document.querySelectorAll("#swatch").forEach(function (div, index) {
        let newColor = chroma(defaultColor).set(
            "hsl.h",
            getHue(defaultColor, index, harmonyAngle, numberHue, harmonyMode)
        );

        if (changeSat == true) {
            newColor = chroma(newColor).set(
                "hsl.s",
                getSat(newColor, index, harmonyAngle, numberHue)
            );
        }

        if (changeLightness == true) {
            newColor = chroma(newColor).set(
                "hsl.l",
                getLightness(newColor, index, harmonyAngle, numberHue)
            );
        }

        printColor(div, newColor, index);
        div.style.backgroundColor = newColor;
        textColor(div, newColor);
    });
}

function updateAll(event) {
    // runs on update of color input
    harmonyMode = document.querySelector("#harmonyMode").value;
    setHarmonyMode(harmonyMode);
    setLayout(harmonyMode);

    document.querySelectorAll("#swatch").forEach(function (div, index) {

        let startColor = colorWell.value;
        console.log(colorWell.value)
        let newColor = chroma(startColor).set(
            "hsl.h",
            getHue(startColor, index, harmonyAngle, numberHue, harmonyMode)
        );
        console.log(newColor)

        if (changeSat == true) {
            newColor = chroma(newColor).set(
                "hsl.s",
                getSat(newColor, index, harmonyAngle, numberHue)
            );
        }

        if (changeLightness == true) {
            newColor = chroma(newColor).set(
                "hsl.l",
                getLightness(newColor, index, harmonyAngle, numberHue)
            );
        }

        div.style.backgroundColor = newColor;
        printColor(div, newColor, index);
        textColor(div, newColor);
    });
}

function updateRandom(event) {
    // runs on update of color input
    harmonyMode = document.querySelector("#harmonyMode").value;
    setHarmonyMode(harmonyMode);
    setLayout(harmonyMode);
    let startColor = chroma.random();
    colorWell.value = startColor;

    document.querySelectorAll("#swatch").forEach(function (div, index) {
        console.log(colorWell.value)
        let newColor = chroma(startColor).set(
            "hsl.h",
            getHue(startColor, index, harmonyAngle, numberHue, harmonyMode)
        );
        console.log(newColor)

        if (changeSat == true) {
            newColor = chroma(newColor).set(
                "hsl.s",
                getSat(newColor, index, harmonyAngle, numberHue)
            );
        }

        if (changeLightness == true) {
            newColor = chroma(newColor).set(
                "hsl.l",
                getLightness(newColor, index, harmonyAngle, numberHue)
            );
        }

        div.style.backgroundColor = newColor;
        printColor(div, newColor, index);
        textColor(div, newColor);
    });
}

function getHue(startColor, index, harmonyAngle, numberHue, harmonyMode) {
    // changes hue
    let hue = Math.round(chroma(startColor).get("hsl.h"));
    if (harmonyMode == "tetradic") {
        if (index % numberHue == 0) {
            hue += 0;
        } else if (index % numberHue == 1) {
            hue += 60;
        } else if (index % numberHue == 2) {
            hue += 180;
        } else if (index % numberHue == 3) {
            hue += 240;
        } return hue;
    } else if (harmonyMode == "triadicComplementary") {
        if (index % numberHue == 0) {
            hue += 0;
        } else if (index % numberHue == 1) {
            hue += 160;
        } else if (index % numberHue == 2) {
            hue += 200;
        } return hue;
    } else if (harmonyMode == "doubleComplementary") {
        if (index % numberHue == 0) {
            hue += 0;
        } else if (index % numberHue == 1) {
            hue += 90;
        } else if (index % numberHue == 2) {
            hue += 180;
        } else if (index % numberHue == 3) {
            hue += 270;
        } return hue;
    } else {
        // one calculation for hue for all remaining modes
        hue += ((harmonyAngle * (index % numberHue)));
        return hue;
    }
}

function getSat(newColor, index, harmonyAngle, numberHue) {
    // changes saturation, more or less saturated depending on orig color
    let sat = chroma(newColor).get("hsl.s");
    if (sat <= 0.5) {
        if (index < numberHue) {
            sat += 0;
        } else if (index < 2 * numberHue) {
            sat += (1 - sat) / 4;
        } else if (index < 3 * numberHue) {
            sat += ((1 - sat) * 2) / 4;
        } else if (index < 4 * numberHue) {
            sat += ((1 - sat) * 3) / 4;
        }
    } else {
        if (index < numberHue) {
            sat -= 0;
        } else if (index < 2 * numberHue) {
            sat -= sat / 4;
        } else if (index < 3 * numberHue) {
            sat -= (sat * 2) / 4;
        } else if (index < 4 * numberHue) {
            sat -= (sat * 3) / 4;
        }
    }
    //console.log("sat " + sat)
    return sat;
}

function getLightness(newColor, index, harmonyAngle, numberHue) {
    // changes lightness, darker or lighter depending on lness of orig color
    let lightness = chroma(newColor).get("hsl.l");
    if (lightness <= 0.5) {
        if (index < numberHue) {
            lightness += 0;
        } else if (index < 2 * numberHue) {
            lightness += (1 - lightness) / 4;
        } else if (index < 3 * numberHue) {
            lightness += ((1 - lightness) * 2) / 4;
        } else if (index < 4 * numberHue) {
            lightness += ((1 - lightness) * 3) / 4;
        }
    } else {
        if (index < numberHue) {
            lightness -= 0;
        } else if (index < 2 * numberHue) {
            lightness -= lightness / 4;
        } else if (index < 3 * numberHue) {
            lightness -= (lightness * 2) / 4;
        } else if (index < 4 * numberHue) {
            lightness -= (lightness * 3) / 4;
        }
    }
    //console.log("sat " + sat)
    return lightness;
}

function cleanHsl(hslVal) {
    // rounds hsl values
    hslVal[0] = Math.round(hslVal[0]);
    hslVal[1] = Math.round(hslVal[1] * 100) / 100;
    hslVal[2] = Math.round(hslVal[2] * 100) / 100;
    return hslVal;
}

function printColor(div, newColor, index) {
    // finds h3 w id "swatchText" and sets the inner text to newColor, then adds same in hsl
    var textElement = div.parentElement.querySelector("#swatchText");
    textElement.innerHTML = "HEX " + newColor;
    var newColorHsl = cleanHsl(chroma(newColor).hsl());
    var textElement2 = div.parentElement.querySelector(".card-text");
    textElement2.innerHTML = "HSL " + newColorHsl;
}

function textColor(div, newColor) {
    // changes text color for accessibility if contrast is lower than 4.5
    if (chroma.contrast(newColor, "black") < 4.5) {
        div.style.color = "white";
    } else {
        div.style.color = "black";
    }
}

function setLayout(harmonyMode) {
    harmonyMode = document.querySelector("#harmonyMode").value;
    switch (harmonyMode) {
        case "complementary":
            document.querySelector("#container-swatches").classList.remove("grid-3-col", "grid-4-col");
            document.querySelector("#container-swatches").classList.add("grid-2-col");
            document.querySelector("#container-swatches").innerHTML = `
            
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
            `;
            
        break;

        case "triadic":
        case "triadicComplementary":
            document.querySelector("#container-swatches").classList.remove("grid-2-col", "grid-4-col");
            document.querySelector("#container-swatches").classList.add("grid-3-col");    
            document.querySelector("#container-swatches").innerHTML = `
		
                <div class="card">
                        <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
                <div class="card">
                        <div id="swatch"></div>
                            <div class="card-body">
                                <h3 id="swatchText"></h3>
                                <p class="card-text"></p>
                            </div>
                </div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>
				
				<div class="card">
                    <div id="swatch"></div>
                        <div class="card-body">
                            <h3 id="swatchText"></h3>
                            <p class="card-text"></p>
                        </div>
				</div>

			`;

            break;

        case "doubleComplementary":
        case "tetradic":
        case "analogous":
        case "neutral":
            document.querySelector("#container-swatches").classList.remove("grid-2-col", "grid-3-col");
            document.querySelector("#container-swatches").classList.add("grid-4-col");
            document.querySelector("#container-swatches").innerHTML = `
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
				
				<div class="card">
  				<div id="swatch"></div>
  				<div class="card-body">
    				<h3 id="swatchText"></h3>
    				<p class="card-text"></p>
  				</div>
				</div>
		
			`;
            break;
    }
}

function copySwatch() {
    let chooseSwatch = document.querySelectorAll("#randomColor")
    chooseSwatch.addEventListener("click", copyThisSwatch)
    console.log("hello")

    function copyThisSwatch() {
        console.log("YE")
        
    }
};
