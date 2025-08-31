async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:3000/songs/");
        let text = await response.text();
        
        let div = document.createElement('div');
        div.innerHTML = text;

        let links = div.getElementsByTagName('a');

        let songs = [];
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if (link.href.endsWith('.mp3')) {
                songs.push(link.href.split('/songs/')[1]);
            }
        }

        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

async function main() {
    let songs = await getSongs();
    let songUL = document.querySelector(".songList ul");
    for (const song of songs) {
        songUL.innerHTML += `
            <div class="sideCard">
                <li>
                    <img class="invert2" src="music.svg" alt="music">
                </li>
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div class="artistName">Keshav, Harry, Bachan Pandey</div>
                </div>
                <div class="play2.0 flex">
                    <p>Play</p>
                    <img class="invert2" src="play.svg" height="20px" alt="play">
                </div>
            </div>`;
    }
}

main();
document.querySelector("#searchButton").addEventListener("click", function(event) {
    event.stopPropagation();
    let existingDiv = document.querySelector(".history");
    let searchValue = document.querySelector("#searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let heading = document.querySelector(".right h1");
    let playBar = document.querySelector(".playBar");
    let found = false;

    // Remove existing div if it exists
    if (existingDiv) {
        existingDiv.remove();
    }

    // Remove play bar area
    if (playBar) {
        playBar.style.display = "none";
    }

    // Check if any card matches the search input
    cards.forEach(card => {
        let cardHeading = card.querySelector("h2").textContent.toLowerCase();
        if (cardHeading.includes(searchValue)) {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    // If no cards match, change heading to 'Not Found'
    if (!found) {
        heading.textContent = 'Not Found';
    } else {
        heading.textContent = 'Top Result';
    }
});

document.addEventListener("click", function(event) {
    let historyDiv = document.querySelector(".history");
    let cards = document.querySelectorAll(".card");
    let heading = document.querySelector(".right h1");

    // Remove the div if it exists and the click is outside the search button
    if (historyDiv && !document.querySelector(".search").contains(event.target)) {
        historyDiv.remove();
        cards.forEach(card => card.style.display = "none");
        heading.textContent = 'Spotify Playlist';

        // Show the play bar again when clicking outside
        let playBar = document.querySelector(".playBar");
        if (playBar) {
            playBar.style.display = "block";
        }
    }
});
