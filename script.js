const colorpickerbtn = document.querySelector("#colorpicker");
const colorlist = document.querySelector(".allcolors");

const clearall = document.querySelector(".clearall");

let pickedcolors = JSON.parse(localStorage.getItem("pickedcolors")) || [];

const copycolor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";

    setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

// Function to display picked colors
const showColors = () => {
    if (!pickedcolors.length) return;
    colorlist.innerHTML = pickedcolors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc" : color}"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
    `).join("");

    document.querySelector(".pickedcolors").classList.remove("hide");

    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copycolor(e.currentTarget.lastElementChild));
    });
}

// Function to handle color picker button click event
const activeEyeDropper =  () => {
    document.body.style.display = "none";
    
    setTimeout(async () => {
        try {
            const eyedropper = new EyeDropper();
            const { sRGBHex } = await eyedropper.open();
            navigator.clipboard.writeText(sRGBHex);
            
            if (!pickedcolors.includes(sRGBHex)) {
                pickedcolors.push(sRGBHex);
                localStorage.setItem("pickedcolors", JSON.stringify(pickedcolors));
                showColors();
            }
        } catch (error) {
            console.error("Error occurred while picking color:", error);
            // You can add additional error handling logic here
        }
    },10)

    document.body.style.display = "block";
}

const clearallcolors = () => {
    pickedcolors.length = 0;
    localStorage.setItem("pickedcolors", JSON.stringify(pickedcolors));
    colorlist.innerHTML = ''; // Clear the displayed list of colors
    document.querySelector(".pickedcolors").classList.add("hide"); // Hide the color list container
}

// Event listener for color picker button click
colorpickerbtn.addEventListener("click", activeEyeDropper);

clearall.addEventListener("click", clearallcolors);

// Initial display of picked colors
showColors();





