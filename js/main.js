function mostrar(id, elemento) {
    document.getElementById('menu-links').classList.remove('abierto');
    document.querySelectorAll('.seccion').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'flex';

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    if (elemento) {
        elemento.classList.add('active');
    }
    history.replaceState(null, null, '#' + id);
}

function toggleMenu() {
    document.getElementById('menu-links').classList.toggle('abierto');
}

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const enlace = document.querySelector(`nav a[onclick*="${hash}"]`);
        mostrar(hash, enlace);
    }

    const musica = document.getElementById('musica');
    const panelMusica = document.getElementById('panel-musica');
    const footer = document.querySelector('footer');
    const discoMusica = document.getElementById('disco-musica');
    const btnMusica = document.getElementById('btn-musica');
    const iconoMusica = document.getElementById('icono-musica');
    const estadoMusica = document.getElementById('estado-musica');
    if (!musica) return;
    musica.volume = 0.3;

    const ajustarPanelMusicaConFooter = () => {
        if (!panelMusica || !footer) return;
        const esMovil = window.matchMedia('(max-width: 768px)').matches;
        if (!esMovil) {
            panelMusica.style.bottom = '20px';
            panelMusica.style.left = 'auto';
            panelMusica.style.right = '20px';
            panelMusica.style.transform = 'none';
            return;
        }
        const footerRect = footer.getBoundingClientRect();
        const solape = window.innerHeight - footerRect.top + 10;
        const extra = Math.max(0, solape);
        panelMusica.style.bottom = `${12 + extra}px`;
        panelMusica.style.left = '50%';
        panelMusica.style.right = 'auto';
        panelMusica.style.transform = 'translateX(-50%)';
    };

    const actualizarUIReproduccion = (reproduciendo) => {
        if (!discoMusica || !iconoMusica || !estadoMusica) return;
        discoMusica.classList.toggle('girando', reproduciendo);
        iconoMusica.className = reproduciendo ? 'fas fa-pause' : 'fas fa-play';
        estadoMusica.textContent = reproduciendo ? 'Sonando ahora' : 'Pausada';
    };

    if (btnMusica) {
        btnMusica.addEventListener('click', async () => {
            if (musica.paused) {
                try {
                    await musica.play();
                    actualizarUIReproduccion(true);
                } catch {
                    actualizarUIReproduccion(false);
                }
            } else {
                musica.pause();
                actualizarUIReproduccion(false);
            }
        });
    }

    musica.addEventListener('play', () => actualizarUIReproduccion(true));
    musica.addEventListener('pause', () => actualizarUIReproduccion(false));
    actualizarUIReproduccion(!musica.paused);
    ajustarPanelMusicaConFooter();
    window.addEventListener('scroll', ajustarPanelMusicaConFooter, { passive: true });
    window.addEventListener('resize', ajustarPanelMusicaConFooter);
});
