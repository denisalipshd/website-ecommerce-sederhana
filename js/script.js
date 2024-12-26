const searchIcon = document.getElementById("icon-search");
const produkCards = document.querySelectorAll(".card-produk");
const btnCheckout = document.querySelectorAll(".tbl-checkout");
const btnCheckoutK = document.getElementById("checkout-barang");
const keranjangIcon = document.getElementById("icon-keranjang");
const notifKeranjang = document.getElementById("notif-keranjang");
const btnKeranjang = document.querySelectorAll(".tbl-keranjang");
const daftarBarang = document.getElementById("daftar-keranjang");
const keranjangPopup = document.getElementById("keranjang-popup");
const tutupKeranjang = document.getElementById("tutup-keranjang");

let totalProduk = 0;
let keranjang = [];

// Event untuk ikon pencarian
searchIcon.addEventListener("click", () => {
  if (!document.getElementById("input-search")) {
    const parent = searchIcon.parentElement;

    const arrowIcon = document.createElement("i");
    arrowIcon.id = "arrow-icon";
    arrowIcon.classList.add("ph", "ph-arrow-left");
    arrowIcon.style.marginRight = "10px";
    arrowIcon.style.cursor = "pointer";

    const inputSearch = document.createElement("input");
    inputSearch.type = "text";
    inputSearch.id = "input-search";
    inputSearch.placeholder = "cari produk";
    inputSearch.style.marginLeft = "10px";

    parent.insertBefore(inputSearch, searchIcon);
    parent.insertBefore(arrowIcon, inputSearch);
    searchIcon.style.display = "none";

    arrowIcon.addEventListener("click", () => {
      inputSearch.remove();
      arrowIcon.remove();
      searchIcon.style.display = "inline-block";

      produkCards.forEach((card) => {
        card.style.display = "block";
      });
    });

    inputSearch.addEventListener("input", () => {
      const searchTerm = inputSearch.value.toLowerCase();

      produkCards.forEach((card) => {
        const namaProduk = card.querySelector("h2").textContent.toLowerCase();

        if (namaProduk.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });

    inputSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const searchTerm = inputSearch.value.toLowerCase();

        produkCards.forEach((card) => {
          const namaProduk = card.querySelector("h2").textContent.toLowerCase();

          if (namaProduk.includes(searchTerm)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  }
});

// btn checkout card
btnCheckout.forEach((button) => {
  button.addEventListener("click", (e) => {
    const parentCard = e.target.parentElement;
    const namaProduk = parentCard.querySelector("h2").textContent;
    const hargaProduk = parentCard.querySelector("h4").textContent;

    const konfirmasi = confirm(`Apakah anda yakin ingin Checkout produk\n${namaProduk} (${hargaProduk})?`);

    if (konfirmasi) {
      alert(`Checkout berhasil untuk produk: ${namaProduk} (${hargaProduk})`);
    }
  });
});

// Event untuk tombol keranjang
btnKeranjang.forEach(function (button) {
  button.addEventListener("click", (e) => {
    const parentCard = e.target.parentElement;
    const namaProduk = parentCard.querySelector("h2").textContent;
    const gambarProduk = parentCard.querySelector("img").src;

    if (keranjang.some((item) => item.nama === namaProduk)) {
      alert("Produk sudah ada di keranjang!");
      return;
    }

    totalProduk++;
    notifKeranjang.style.display = "inline-block";
    notifKeranjang.textContent = totalProduk;

    keranjang.push({ nama: namaProduk, gambar: gambarProduk });

    updateKeranjangPopup();
  });
});

// btn checkout keranjang
btnCheckoutK.addEventListener("click", () => {
  if (keranjang.length === 0) {
    alert("Keranjang kosong! Tambahkan produk sebelum checkout.");
    return;
  }

  const konfirmasi = confirm("Apakah anda yakin ingin Checkout?");

  if (konfirmasi) {
    alert(`Checkout Berhasil! Anda membeli ${totalProduk} Produk`);

    keranjang = [];
    totalProduk = 0;
    notifKeranjang.style.display = "none";
    updateKeranjangPopup();
  }
});

function updateKeranjangPopup() {
  daftarBarang.innerHTML = "";

  keranjang.forEach((barang, index) => {
    const item = document.createElement("li");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.justifyContent = "space-between";
    item.style.marginBottom = "10px";
    item.style.padding = "10px";
    item.style.border = "1px solid #ddd";
    item.style.borderRadius = "8px";
    item.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

    const img = document.createElement("img");
    img.src = barang.gambar;
    img.alt = barang.nama;
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.marginRight = "15px";
    img.style.borderRadius = "8px";

    const nama = document.createElement("span");
    nama.textContent = barang.nama;
    nama.style.flexGrow = "1";
    nama.style.fontSize = "14px";
    nama.style.fontWeight = "500";
    nama.style.color = "#333";

    const hapusButton = document.createElement("button");
    hapusButton.textContent = "Hapus";
    hapusButton.style.backgroundColor = "#f44336";
    hapusButton.style.color = "#fff";
    hapusButton.style.border = "none";
    hapusButton.style.padding = "8px 12px";
    hapusButton.style.borderRadius = "4px";
    hapusButton.style.cursor = "pointer";
    hapusButton.style.fontSize = "12px";
    hapusButton.style.fontWeight = "600";
    hapusButton.onclick = () => hapusBarang(index);

    item.appendChild(img);
    item.appendChild(nama);
    item.appendChild(hapusButton);

    daftarBarang.appendChild(item);
  });
}

function hapusBarang(index) {
  keranjang.splice(index, 1);
  totalProduk--;
  notifKeranjang.textContent = totalProduk;

  if (totalProduk === 0) {
    notifKeranjang.style.display = "none";
  }

  updateKeranjangPopup();
}

keranjangIcon.addEventListener("click", () => {
  keranjangPopup.style.display = "block";
});

tutupKeranjang.addEventListener("click", () => {
  keranjangPopup.style.display = "none";
});
