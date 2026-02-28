<script>
const playlists = [
  { name: "Football ⚽", url: "go:fbl" },
  { name: "Cricket 🏏", url: "go:cri" },
  { name: " Star Sports 🌟 ", url: "go:star " },
  { name: "Fancode ‣", url: "go:fan" },
  { name: "Sony LiV ‣ ", url: "go:liv" },
];

const container = document.getElementById("playlistContainer");

playlists.forEach(item => {
  const card = document.createElement("a");
  card.className = "card";
  card.href = item.url;
  card.target = "_blank";
  card.textContent = item.name;
  container.appendChild(card);
});

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
</script>
