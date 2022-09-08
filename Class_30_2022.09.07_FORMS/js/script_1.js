const urlParams = new URLSearchParams(location.search);

var data = {};

for (const [key, value] of urlParams) {
    console.log(`${key}:${value}`);
    data[key] = value;
}

document.getElementById('congrat').innerText = data.name+', '+document.getElementById('congrat').innerText;