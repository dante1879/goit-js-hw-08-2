import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

function updateLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

player.on('timeupdate', throttle(updateLocalStorage, 1000));

try {
  player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0);
} catch (error) {
  console.log(error);
}
