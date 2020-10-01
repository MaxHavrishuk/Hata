// #Variables
let files
let mediaFiles = []
let albumsList = document.querySelector('.albums-list')

// #Description length
editDescriptionLength()

function editDescriptionLength() {
    let allDesc = document.querySelectorAll('.album-description')
    for (let i = 0; i < allDesc.length; i++) {
        allDesc[i].setAttribute('title', `${allDesc[i].innerHTML}`)
        if (allDesc[i].innerHTML.length > 27) {
            allDesc[i].innerHTML = `${allDesc[i].innerHTML.substr(0, 41)}...`
        }
    }
}

// #OnChange
function onChange(event) {
    files = event.target.files
    for (let i = 0; i < files.length; i++) {
        let check = addToArray(files[i])
        if (check) {
            showThumbs(files[i].size, files[i].lastModified, i)
        } else {
            alert(`File: ${files[i].name} has already been added!`)
        }
    }
    numRestruct()
    document.getElementById("fileInputControl").value = ""
    console.log(mediaFiles)
}

// #Add To Array
function addToArray(item) {
    let ifExist = checkBySize(item);
    if (ifExist) {
        return false
    } else {
        mediaFiles.push(item)
        return true
    }
}

// #Check By Size
function checkBySize(item) {
    for (let i = 0; i < mediaFiles.length; i++) {
        if (mediaFiles[i].size === item.size) {
            return true
        }
    }
    return false
}

// #Show thumbs
function showThumbs(fileSize, fileLastModified, i) {
    let div = document.createElement('div')
    div.setAttribute('class', 'col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4')
    div.innerHTML = `
    <div class="card preview-item mb-5">
        <div class="thumb-wrp">
            <img src="${URL.createObjectURL(event.target.files[i])}" 
                class="card-img-top thumb" 
                alt="">
        </div>
        <!-- #Input -->
        <div class="card-body thumb-input">
            <input type="text" 
                class="form-control file-name"
                id="thumb-input${i}"
                aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-sm"
                name="name"
                placeholder="Name">
        </div>
        <!-- Dropright button -->
        <div class="btn-group thumb-menu">
            <button type="button" 
                class="btn btn-dark thumb-btn" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu">
                <!-- #Checkbox -->
                <div class="form-check checkbox-wrap ml-1 mb-3">
                    <input class="form-check-input thumb-checkbox" 
                        type="checkbox" 
                        id="${fileLastModified}" 
                        title="Set as album cover" 
                        onclick="selectAlbumCover(this.id)">
                    <label class="form-check-label" for="${fileLastModified}">
                        <span class="thumb-checkbox-text mr-1">Set as album cover</span>
                    </label>
                </div>
                <div class="dropdown-divider"></div>
                <!-- #Remove -->
                <div class="remove ml-1" 
                    id="${fileSize}" 
                    onclick="deleteItem(this.id)"
                    title="Remove">
                    <i class="fas fa-trash-alt"></i>
                    Remove
                </div>
            </div>
        </div>    
    </div>`
    document.querySelector('.output').insertBefore(div, null);

    let thumb = document.querySelectorAll('.thumb')
    thumb.onload = () => {
        URL.revokeObjectURL(thumb.src)
    }
}

// #Delete thumb
function deleteItem(id) {
    let selectedId = Number(id)
    for (let i = 0; i < mediaFiles.length; i++) {
        if (mediaFiles[i].size === selectedId) {
            mediaFiles.splice(i, 1)
            document.getElementById(id)
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .setAttribute("style", "opacity: 0")
            setTimeout(() => {
                document.getElementById(id)
                    .parentElement
                    .parentElement
                    .parentElement
                    .parentElement
                    .remove()
            }, 500)
        }
    }
    setTimeout(() => {
        numRestruct()
    }, 1000)
}

// #ID Restruct
function numRestruct() {
    let arr = document.querySelectorAll(".file-name")
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = `thumb-input${i}`
    }
}

// #Select album cover
function selectAlbumCover(id) {
    for (let i = 0; i < mediaFiles.length; i++) {
        document.getElementById(mediaFiles[i].lastModified).checked = false
    }
    document.getElementById(id).checked = true
}

//#To Send
document.addEventListener('DOMContentLoaded', init)

function init() {
    document.querySelector('#btn-submit').addEventListener('click', toSend)
}

function toSend(e) {

    // #Cancel the event(submit)
    e.preventDefault()

    // #Variables
    let fileNames = []
    let checkBoxes = []
    let formData = new FormData()
    let xhr = new XMLHttpRequest()

    // #File names to array
    for (let i = 0; i < mediaFiles.length; i++) {
        if (!document.querySelector(`#thumb-input${i}`).value) {
            fileNames.push('')
        } else {
            fileNames.push(document.querySelector(`#thumb-input${i}`).value.trim())
        }
    }

    // #Value of checkboxes to array
    for (let i = 0; i < mediaFiles.length; i++) {
        checkBoxes.push(document.getElementById(mediaFiles[i].lastModified).checked)
    }

    console.log(fileNames, checkBoxes)

    // #Creating albumInfo object
    let albumInfo = {
        albumName: document.querySelector('#album-name').value.trim(),
        albumDescription: document.querySelector('#album-description').value.trim(),
        files: []
    }
    for (let i = 0; i < mediaFiles.length; i++) {
        albumInfo.files[i] = { name: fileNames[i], isCover: checkBoxes[i] }
    }

    // #albumInfo to JSON
    let albumInfoJson = JSON.stringify(albumInfo)
    console.log(albumInfo, albumInfoJson)

    // #Album info(json) to FormData
    formData.append('albumInfo', albumInfoJson)

    //#Media files to FormData
    for (let i = 0; i < mediaFiles.length; i++) {
        formData.append('file', mediaFiles[i])
    }

    xhr.open('POST', '/Home/Upload', true)
    xhr.send(formData)

    xhr.onload = () => {
        if (xhr.response !== 'OK') { // analyze HTTP status of the response
            Swal.fire({
                icon: 'error',
                title: 'Упс...',
                text: 'Помилка створення Альбому'
            }) // e.g. 404: Not Found

        } else { // show the result
            Swal.fire({
                icon: 'success',
                title: 'Файно!',
                text: `Альбом створено`
            }) // response is the server
            document.querySelector('.swal2-confirm').addEventListener('click', () => { location.reload() })
        }
    };

    //xhr.onprogress = (event) => {
    //    if (event.lengthComputable) {
    //        alert(`Received ${event.loaded} of ${event.total} bytes`);
    //    } else {
    //        alert(`Received ${event.loaded} bytes`); // no Content-Length
    //    }

    //};

    xhr.onerror = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    };
}

// #Display width event
window.addEventListener('load', () => {
    let clientWidth = document.body.clientWidth;
    if (clientWidth < 576) {
        addClass();
    } else if (clientWidth > 575) {
        removeClass();
    }
});

window.addEventListener('resize', () => {
    let clientWidth = document.body.clientWidth;
    console.log(clientWidth);
    if (clientWidth < 576) {
        addClass();
    } else if (clientWidth > 575) {
        removeClass();
    }
});

function addClass() {
    document.querySelector('.add-album-btn').classList.add('add-album-btn-mobile');
    document.querySelector('.add-album-btn').innerHTML = `<i class="fas fa-plus"></i>`;

    document.querySelectorAll('.card-body').forEach((element) => {
        element.classList.add('card-body-mobile');
    })

    document.querySelectorAll('.album-cover-img').forEach((element) => {
        element.classList.add('album-cover-img-mobile');
    })

    document.querySelectorAll('.album-name-row').forEach((element) => {
        element.classList.add('album-name-row-mobile');
    })

    document.querySelectorAll('.album-description-row').forEach((element) => {
        element.classList.add('album-description-row-mobile');
    })

    document.querySelectorAll('.dropup').forEach((element) => {
        element.classList.add('dropup-mobile');
    })

    document.querySelectorAll('.card-btn-settings').forEach((element) => {
        element.classList.add('card-btn-settings-mobile');
    })
}

function removeClass() {
    document.querySelector('.add-album-btn').classList.remove('add-album-btn-mobile');
    document.querySelector('.add-album-btn').innerHTML = 'Додати альбом';

    document.querySelectorAll('.card-body').forEach((element) => {
        element.classList.remove('card-body-mobile');
    })

    document.querySelectorAll('.album-cover-img').forEach((element) => {
        element.classList.remove('album-cover-img-mobile');
    })

    document.querySelectorAll('.album-name-row').forEach((element) => {
        element.classList.remove('album-name-row-mobile');
    })

    document.querySelectorAll('.album-description-row').forEach((element) => {
        element.classList.remove('album-description-row-mobile');
    })

    document.querySelectorAll('.dropup').forEach((element) => {
        element.classList.remove('dropup-mobile');
    })

    document.querySelectorAll('.card-btn-settings').forEach((element) => {
        element.classList.remove('card-btn-settings-mobile');
    })
}