const audio = document.getElementById('bg-music');
const progressBar = document.getElementById('music-progress-bar');

function toggleMusic() {
    if (audio.paused) {
        audio.play().then(() => {
            console.log('Playback started successfully');
        }).catch(error => {
            console.error('Playback failed:', error);
        });
    } else {
        audio.pause();
        console.log('Playback paused');
    }
}

document.getElementById('play-music-btn').addEventListener('click', toggleMusic);

audio.addEventListener('timeupdate', () => {
    console.log(`currentTime: ${audio.currentTime} / ${audio.duration}`);
    if (!isNaN(audio.duration)) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        console.log(`progressPercent: ${progressPercent}%`);
        progressBar.style.width = `${progressPercent}%`;
    }
});

function toggleMusic() {
    const btn = document.getElementById('play-music-btn');
    if (audio.paused) {
        audio.play().then(() => {
            console.log('Playback started successfully');
            btn.textContent = '멈춤';
        }).catch(error => {
            console.error('Playback failed:', error);
        });
    } else {
        audio.pause();
        console.log('Playback paused');
        btn.textContent = '재생';
    }
}



