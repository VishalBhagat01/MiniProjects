const filter = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    Exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 10,
        unit: "px",
    },
    grayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
}

const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("image-input");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let img = null;
const resetButton = document.getElementById("reset-btn");
const downlaodButton = document.getElementById("download-btn");
const presetButtons = document.querySelectorAll(".preset-btn");

const filterContainer = document.querySelector(".filters");

const defaultFilterValues = {
    Brightness: 100,
    Contrast: 100,
    Exposure: 100,
    Saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
};

const presetFilters = {
    original: defaultFilterValues,
    vintage: {
        Brightness: 110,
        Contrast: 115,
        Exposure: 100,
        Saturation: 70,
        hueRotation: 20,
        blur: 1,
        grayScale: 0,
        sepia: 35,
        opacity: 100,
        invert: 0,
    },
    bw: {
        Brightness: 100,
        Contrast: 125,
        Exposure: 100,
        Saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayScale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    warm: {
        Brightness: 105,
        Contrast: 110,
        Exposure: 100,
        Saturation: 120,
        hueRotation: 10,
        blur: 0,
        grayScale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0,
    },
    cool: {
        Brightness: 100,
        Contrast: 110,
        Exposure: 100,
        Saturation: 110,
        hueRotation: 180,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
    dramatic: {
        Brightness: 90,
        Contrast: 160,
        Exposure: 100,
        Saturation: 130,
        hueRotation: 0,
        blur: 0,
        grayScale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
    },
};

function createFilter(name , unit = "%" , value , min = 0 , max = 200) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.id = name;
    input.min = min;
    input.max = max;
    input.value = value;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filter[name].value = input.value;
        applyFilters();
    });

    return div;
}

function applyFilterValues(values) {
    Object.keys(filter).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
            filter[key].value = values[key];
        }

        const input = document.getElementById(key);
        if (input) {
            input.value = filter[key].value;
        }
    });
}

function setActivePreset(presetName) {
    presetButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.preset === presetName);
    });
}

function resetFilters() {
    applyFilterValues(defaultFilterValues);
    setActivePreset("original");
}

function initializeFilters() {
    Object.keys(filter).forEach((key) => {
        const filterElement = createFilter(key, filter[key].unit, filter[key].value, filter[key].min, filter[key].max);
        filterContainer.appendChild(filterElement);
    });
}

initializeFilters();

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder");

    if (!file) return;

    if (imagePlaceholder) {
        imagePlaceholder.style.display = "none";
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
        img = image;
        imageCanvas.width = image.width;
        imageCanvas.height = image.height;
        imageCanvas.style.display = "block";
        canvasCtx.drawImage(image, 0, 0);
    }
})

function applyFilters() {
    if (!img) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `brightness(${filter.Brightness.value}${filter.Brightness.unit}) 
                        contrast(${filter.Contrast.value}${filter.Contrast.unit}) 
                        saturate(${filter.Saturation.value}${filter.Saturation.unit})
                        hue-rotate(${filter.hueRotation.value}${filter.hueRotation.unit})
                        blur(${filter.blur.value}${filter.blur.unit})
                        grayscale(${filter.grayScale.value}${filter.grayScale.unit})
                        sepia(${filter.sepia.value}${filter.sepia.unit})
                        opacity(${filter.opacity.value}${filter.opacity.unit})
                        invert(${filter.invert.value}${filter.invert.unit})`;

    canvasCtx.drawImage(img, 0, 0);
}

presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const presetName = button.dataset.preset;
        const selectedPreset = presetFilters[presetName];

        if (!selectedPreset) return;

        applyFilterValues(selectedPreset);
        setActivePreset(presetName);

        if (img) {
            applyFilters();
        }
    });
});

resetButton.addEventListener("click", () => {
    resetFilters();
    canvasCtx.filter = "none";
    applyFilters();
});

downlaodButton.addEventListener("click", () => {
    if (!img) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})