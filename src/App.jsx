import { useEffect, useMemo, useState } from 'react'
import { menuCategories, restaurant } from './data/menu'
import './App.css'

function Icon({ name }) {
  const paths = { arrow: 'M5 12h14m-6-6 6 6-6 6', pin: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z M12 10h.01', search: 'm20 20-4.3-4.3 M10.8 17a6.2 6.2 0 1 1 0-12.4 6.2 6.2 0 0 1 0 12.4Z', phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z' }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>
}

function Mark() {
  return <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 3.3C12 3.5 6.8 5 4.5 8.3c-1.8 2.6-.5 5.9 2.5 6.4 3.8.6 8.1-3.7 10.2-8.2-1.4 4.2-4.7 7.8-8.7 11.1-.7.6-.7 1.6-.1 2.1.6.5 1.5.2 1.8-.5.8-1.8 2.3-3.2 4.1-4.7 3.4-2.9 5.7-5.7 6.4-11.2Z"/></svg>
}

function Product({ product }) {
  const [name, pricing] = product
  return <article className="dish"><span className="dish-initial" aria-hidden="true">{name.charAt(0)}</span><div className="dish-main"><h3>{name}</h3><div className="dish-rule"/>{typeof pricing === 'object' ? <div className="dish-sizes">{Object.entries(pricing).map(([size, price]) => <span key={size}>{size} <b>{price}</b></span>)}</div> : <strong className="dish-price">{pricing}</strong>}</div></article>
}

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const categories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('fr')
    return menuCategories.filter((category) => {
      if (activeCategory !== 'all' && category.id !== activeCategory) return false
      if (!query) return true
      return category.name.toLocaleLowerCase('fr').includes(query) || category.products.some(([name]) => name.toLocaleLowerCase('fr').includes(query))
    })
  }, [activeCategory, search])

  useEffect(() => {
    const handleInstall = (event) => { event.preventDefault(); setInstallPrompt(event) }
    window.addEventListener('beforeinstallprompt', handleInstall)
    return () => window.removeEventListener('beforeinstallprompt', handleInstall)
  }, [])

  const installApp = async () => { if (installPrompt) { await installPrompt.prompt(); setInstallPrompt(null) } }

  return <main>
    <div className="announcement"><span className="availability-dot"/> LE GOÛT DU QUARTIER, SERVI BIEN CHAUD <span className="announcement-divider"><Mark/></span> RAS JEBEL</div>
    <header className="site-header" id="top"><a className="brand" href="#top" aria-label="Pizzaria Beb Lhouma, accueil"><img src="/images/logo_restaurant.png" alt=""/><span><b>Pizzaria</b><strong>Beb Lhouma<span>.</span></strong></span></a><button className="mobile-menu" type="button" aria-label={menuOpen ? 'Fermer la navigation' : 'Ouvrir la navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button><nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Navigation principale"><a href="#menu" onClick={() => setMenuOpen(false)}>Notre menu</a><a href="#story" onClick={() => setMenuOpen(false)}>Notre adresse</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a className="nav-call" href="tel:+21658855100"><Icon name="phone"/> Appeler</a></nav></header>

    <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/> LA TABLE DU QUARTIER DEPUIS TOUJOURS</p><h1 id="hero-title">Les bons<br/>moments ont<br/><em>bon goût.</em></h1><p className="hero-description">Une pizza qui sort du four, un sandwich fait comme il faut. Ici, on cuisine pour le quartier et on le fait avec le cœur.</p><div className="hero-links"><a className="button button-dark" href="#menu">Explorer le menu <Icon name="arrow"/></a><a className="text-link" href={restaurant.mapsUrl}><Icon name="pin"/> Nous trouver</a></div><div className="hero-signoff"><span className="signoff-star"><Mark/></span><span>Fait avec amour<br/><b>à Beb Lhouma</b></span><span className="signoff-rule"/><span className="signoff-city">RAS JEBEL<br/>AVEC AMOUR</span></div></div><div className="hero-art" aria-label="Illustration graphique aux couleurs de Pizzaria Beb Lhouma"><div className="art-paper"><span className="art-topline">PIZZARIA <i><Mark/></i> BEB LHOUMA</span><div className="art-sun"><span>LE GOÛT</span><strong>DU COIN</strong><span>DEPUIS BEB LHOUMA</span></div><span className="art-big-letter">P.</span><div className="art-ribbon"><span>FAIT ICI</span><i><Mark/></i><span>PARTAGÉ ICI</span></div><div className="art-doodle doodle-one"><Mark/></div><div className="art-doodle doodle-two"><Mark/></div><div className="art-location"><Icon name="pin"/> RAS JEBEL</div></div><div className="art-side-note">LE GOÛT DU QUARTIER</div><div className="photo-note"><span className="photo-note-mark">P</span><span>Une bonne part<br/>de chez nous.</span><span aria-hidden="true">↗</span></div></div><div className="hero-side-label">PIZZARIA BEB LHOUMA · RAS JEBEL</div></section>

    <section className="marquee" aria-label="Nos spécialités"><div className="marquee-track">{[0,1,2,3].map((number) => <span key={number}>PIZZA AU FOUR <i><Mark/></i> TACOS GÉNÉREUX <i><Mark/></i> SAVEURS DU QUARTIER <i><Mark/></i> BONJOUR RAS JEBEL <i><Mark/></i></span>)}</div></section>

    <section className="menu-section" id="menu"><div className="menu-intro"><div><p className="eyebrow"><span className="eyebrow-line"/> 01 — LA CARTE</p><h2>Bien manger.<br/><em>Tout simplement.</em></h2></div><p>De bons ingrédients, des recettes généreuses et un menu pour toutes les envies. Choisis ton classique.</p></div><div className="menu-toolbar"><div className="category-tabs" role="group" aria-label="Filtrer par catégorie"><button className={activeCategory === 'all' ? 'selected' : ''} onClick={() => setActiveCategory('all')}>Tout voir <span>{menuCategories.reduce((total, category) => total + category.products.length, 0)}</span></button>{menuCategories.map((category) => <button className={activeCategory === category.id ? 'selected' : ''} key={category.id} onClick={() => setActiveCategory(category.id)}>{category.name}</button>)}</div><label className="menu-search"><Icon name="search"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Chercher un plat…" aria-label="Rechercher un plat"/><kbd>⌕</kbd></label></div>
      {categories.length ? <div className="menu-grid">{categories.map((category, index) => <section className="menu-card" id={category.id} key={category.id}><div className="menu-card-photo"><img src={category.image} alt={`Spécialité ${category.name} de la Pizzaria Beb Lhouma`} loading={index > 1 ? 'lazy' : 'eager'} decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'}/><span className="menu-card-number">0{menuCategories.indexOf(category) + 1}</span><span className="menu-card-photo-label">{category.eyebrow}</span></div><div className="menu-card-content"><div className="menu-card-heading"><h3>{category.name}</h3><span>{category.products.length} PLATS</span></div><div className="dish-list">{category.products.filter(([name]) => !search.trim() || name.toLocaleLowerCase('fr').includes(search.trim().toLocaleLowerCase('fr')) || category.name.toLocaleLowerCase('fr').includes(search.trim().toLocaleLowerCase('fr'))).map((product) => <Product key={product[0]} product={product}/>)}</div></div></section>)}</div> : <div className="empty-state"><span><Mark/></span><h3>Pas encore à la carte.</h3><p>Essaie un autre nom ou explore nos catégories.</p><button onClick={() => { setSearch(''); setActiveCategory('all') }}>Tout le menu</button></div>}
      <div className="menu-bottom-note"><span><Mark/></span><p>Un petit creux ? <b>On est juste au coin de la rue.</b></p><a href="tel:+21658855100">Appelle-nous <Icon name="arrow"/></a></div></section>

    <section className="story" id="story"><a className="story-map" href={restaurant.mapsUrl} target="_blank" rel="noreferrer" aria-label="Ouvrir la carte pour localiser Pizzaria Beb Lhouma à Ras Jebel"><div className="map-grid"/><svg className="map-roads" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M-40 345 120 265 236 290 365 185 640 215"/><path d="M40 -30 155 110 236 290 226 500"/><path d="m300-30 18 110 47 75 8 115 85 210"/><path d="m-20 95 175 15 163-30 170 35 150-45"/><path d="m-30 425 133-115 105-20 86 17 114-76 220 31"/><path d="m446-30-20 145 33 67-33 110 66 148"/></svg><span className="map-water water-one"/><span className="map-water water-two"/><span className="map-district district-one">RAS JEBEL</span><span className="map-district district-two">CENTRE VILLE</span><span className="map-district district-three">AVENUE PRINCIPALE</span><span className="map-marker"><span className="marker-pulse"/><span className="marker-pin"><img src="/images/logo_restaurant.png" alt=""/></span></span><span className="map-place-label"><b>PIZZARIA<br/>BEB LHOUMA</b><small>VOIR L'ITINÉRAIRE ↗</small></span><span className="map-scale">RAS JEBEL <i/> NOTRE QUARTIER</span><span className="map-coordinates">36° 52′ N<br/>10° 07′ E</span></a><div className="story-content"><p className="eyebrow"><span className="eyebrow-line"/> 02 — NOTRE QUARTIER</p><h2>Une petite<br/>adresse.<br/><em>Un grand cœur.</em></h2><p>On connaît les goûts d'ici, les pauses déjeuner qui comptent et les soirées où une pizza rassemble tout le monde. Chez Beb Lhouma, la bonne cuisine, c'est celle qu'on partage.</p><a className="story-link" href={restaurant.mapsUrl} target="_blank" rel="noreferrer"><Icon name="pin"/> Retrouve-nous à Ras Jebel <Icon name="arrow"/></a><div className="story-seal">DEPUIS<br/><b>BEB<br/>LHOUMA</b></div></div></section>

    <section className="social-section"><div className="social-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> LES BONS MOMENTS SE PARTAGENT</p><h2>On se retrouve<br/><em>en ligne aussi.</em></h2></div><p>Les photos, les nouveautés et la vie du quartier. Suis-nous !</p></div><div className="social-grid">{Object.entries(restaurant.socials).map(([name, url]) => <a className="social-card" href={url} target="_blank" rel="noreferrer" key={name}><span className="social-card-name">{name}</span><span className="social-card-handle">@pizzariabeblhouma</span><Icon name="arrow"/></a>)}</div></section>

    <section className="contact" id="contact"><div className="contact-top"><p className="eyebrow"><span className="eyebrow-line"/> 03 — À TOUT DE SUITE ?</p><span className="contact-stamp">BON<br/>APPÉTIT</span></div><div className="contact-main"><h2>On garde<br/>une part<br/><em>pour toi.</em></h2><div className="contact-details"><p>Pour une question, une commande ou simplement nous dire bonjour.</p>{restaurant.phones.map((phone, index) => <a className="contact-phone" href={`tel:+216${phone.replaceAll(' ', '')}`} key={phone}><span>LIGNE 0{index + 1}</span><strong>{phone}</strong><Icon name="arrow"/></a>)}<a className="contact-map" href={restaurant.mapsUrl}><Icon name="pin"/> Ouvrir l'itinéraire <Icon name="arrow"/></a></div></div></section>

    <footer className="footer"><a className="footer-brand" href="#top"><img src="/images/logo_restaurant.png" alt=""/><span><strong>Pizzaria Beb Lhouma</strong><small>Le goût du quartier.</small></span></a><div className="footer-meta"><span>Fait avec amour à Ras Jebel <i><Mark/></i></span><span>© 2026 · PIZZARIA BEB LHOUMA</span></div><button className="install-button" type="button" onClick={installApp} disabled={!installPrompt}>Installer l'app <Icon name="arrow"/></button></footer>
  </main>
}

export default App
