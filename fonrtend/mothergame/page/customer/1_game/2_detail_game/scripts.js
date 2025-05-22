function scrollThumbnails(direction) {
    const container = document.getElementById('thumbnailScroll');
    const scrollAmount = 100; // ระยะที่เลื่อน
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}


