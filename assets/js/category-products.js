(function () {
	const CATEGORY_RULES = {
		"estilo-vida": {
			aplicaciones: ["AUTO", "CAMIONETA"],
			clases: ["LLANTA"],
			limit: 100,
		},
		"estilo-de-vida": {
			aplicaciones: ["AUTO", "CAMIONETA"],
			clases: ["LLANTA"],
			limit: 100,
		},
		transporte: {
			aplicaciones: ["CAMION"],
			clases: ["LLANTA"],
			limit: 100,
		},
		"camaras-y-corbatas": {
			clases: ["CAMARA", "CORBATA", "O-RING"],
			limit: 100,
		},
		remolque: {
			aplicaciones: ["REMOLQUE"],
			clases: ["LLANTA"],
			limit: 100,
		},
		industria: {
			aplicaciones: ["INDUSTRIAL"],
			clases: ["LLANTA"],
			limit: 100,
		},
		mineria: {
			aplicaciones: ["OTR"],
			clases: ["LLANTA"],
			limit: 100,
		},
		"mundo-del-golf": {
			aplicaciones: ["SPECIALTY", "IMPLEMENTO AGRICOLA"],
			clases: ["LLANTA"],
			limit: 100,
		},
		agricultura: {
			aplicaciones: ["AGRICOLA", "IMPLEMENTO AGRICOLA"],
			clases: ["LLANTA"],
			limit: 100,
		},
		otr: {
			aplicaciones: ["OTR"],
			clases: ["LLANTA"],
			limit: 100,
		},
		puerto: {
			aplicaciones: ["INDUSTRIAL"],
			clases: ["LLANTA"],
			limit: 100,
		},
		powersports: {
			aplicaciones: ["POWERSPORTS", "MOTO"],
			clases: ["LLANTA"],
			limit: 100,
		},
		rines: {
			clases: ["RINES"],
			limit: 100,
		},
	};

	const main = document.querySelector("main[id]");
	if (!main) return;

	const categoryId = main.id;
	const rule = CATEGORY_RULES[categoryId];
	if (!rule) return;

	const CATEGORY_PLACEHOLDERS = {
		"estilo-vida": "../assets/placeholders/estiloDeVida.webp",
		"estilo-de-vida": "../assets/placeholders/estiloDeVida.webp",
		transporte: "../assets/placeholders/transporte.webp",
		"camaras-y-corbatas": "../assets/placeholders/camaraCorbata.webp",
		remolque: "../assets/placeholders/rmolque.webp",
		industria: "../assets/placeholders/industrial.webp",
		mineria: "../assets/placeholders/minero.webp",
		"mundo-del-golf": "../assets/placeholders/carroGolf.webp",
		agricultura: "../assets/placeholders/agricultura.webp",
		otr: "../assets/placeholders/otr.webp",
		puerto: "../assets/placeholders/puerto.webp",
		powersports: "../assets/placeholders/powerSports.webp",
		rines: "../assets/placeholders/rim.webp",
	};

	const grid = document.querySelector("section.grid");
	if (!grid) return;

	const MODAL_STYLE_ID = "product-modal-styles";
	if (!document.getElementById(MODAL_STYLE_ID)) {
		const modalStyle = document.createElement("style");
		modalStyle.id = MODAL_STYLE_ID;
		modalStyle.textContent = `
			.product-modal-overlay {
				position: fixed;
				inset: 0;
				display: none;
				align-items: center;
				justify-content: center;
				padding: 20px;
				background: rgba(5, 9, 17, 0.75);
				backdrop-filter: blur(5px);
				z-index: 120;
			}

			.product-modal-overlay.is-open {
				display: flex;
			}

			.product-modal {
				width: min(860px, 100%);
				border-radius: 18px;
				border: 1px solid rgba(255, 255, 255, 0.14);
				background: linear-gradient(180deg, #121b30, #0f172a 65%, #0b1220);
				box-shadow: 0 35px 70px rgba(0, 0, 0, 0.5);
				overflow: hidden;
			}

			.product-modal-body {
				display: grid;
				grid-template-columns: minmax(240px, 320px) 1fr;
				gap: 0;
			}

			.product-modal-image {
				min-height: 260px;
				background-size: cover;
				background-position: center;
				position: relative;
			}

			.product-modal-content {
				padding: 22px;
				display: grid;
				gap: 12px;
			}

			.product-modal-head {
				display: flex;
				justify-content: space-between;
				gap: 12px;
				align-items: flex-start;
			}

			.product-modal-title {
				margin: 0;
				font-size: 24px;
				line-height: 1.2;
			}

			.product-modal-close {
				border: 1px solid rgba(255, 255, 255, 0.22);
				background: rgba(255, 255, 255, 0.08);
				color: #eaf0ff;
				width: 36px;
				height: 36px;
				border-radius: 999px;
				font-size: 20px;
				line-height: 1;
				cursor: pointer;
			}

			.product-modal-content .meta { opacity: 0.9; }

			.product-modal-info {
				display: grid;
				gap: 8px;
			}

			.product-modal-info-row {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
			}

			.product-modal-info-row .spec {
				display: inline-flex;
				padding: 6px 10px;
				border-radius: 999px;
				font-size: 12px;
				font-weight: 800;
				border: 1px solid rgba(255, 255, 255, 0.16);
				background: rgba(255, 255, 255, 0.07);
			}

			.product-modal-actions {
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
				margin-top: 6px;
			}

			@media (max-width: 820px) {
				.product-modal-body {
					grid-template-columns: 1fr;
				}

				.product-modal-image {
					min-height: 200px;
				}
			}
		`;
		document.head.appendChild(modalStyle);
	}

	const BUTTON_STYLE_ID = "product-action-button-colors";
	if (!document.getElementById(BUTTON_STYLE_ID)) {
		const style = document.createElement("style");
		style.id = BUTTON_STYLE_ID;
		style.textContent = `
			.actions .btn.buy-btn {
				background: #FFE600;
				border-color: #FFE600;
				color: #1d1d1f;
			}

			.actions .btn.whatsapp-btn {
				background: #25D366;
				border-color: #25D366;
				color: #ffffff;
			}
		`;
		document.head.appendChild(style);
	}

	const WHATSAPP_NUMBER = "524448278252";
	const WHATSAPP_ICON = `
		<span class="btn-icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" role="img" focusable="false">
				<path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.52 0 .2 5.32.2 11.87c0 2.1.55 4.15 1.6 5.96L0 24l6.33-1.75a11.82 11.82 0 0 0 5.74 1.47h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.43-8.37Zm-8.45 18.24h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.76 1.04 1-3.67-.24-.38a9.85 9.85 0 0 1-1.5-5.24c0-5.43 4.42-9.85 9.86-9.85 2.62 0 5.09 1.02 6.95 2.89a9.8 9.8 0 0 1 2.89 6.96c0 5.43-4.43 9.84-9.86 9.84Zm5.4-7.37c-.3-.16-1.78-.88-2.06-.98-.27-.1-.47-.16-.67.16-.2.3-.77.97-.95 1.17-.18.2-.36.22-.66.08-.3-.16-1.28-.47-2.43-1.5a8.97 8.97 0 0 1-1.68-2.07c-.18-.31-.02-.48.14-.64.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.54-.08-.16-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.04-1.05 2.53s1.07 2.94 1.22 3.14c.15.2 2.1 3.2 5.07 4.49.71.3 1.27.48 1.71.61.72.23 1.38.2 1.9.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.27-.2-.57-.35Z" />
			</svg>
		</span>`;
	const MERCADO_LIBRE_ICON = `
		<span class="btn-icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" role="img" focusable="false">
				<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
			</svg>
			
		</span>`;

	const isValidLink = (link) => {
		if (!link) return false;
		const normalized = String(link).trim().toUpperCase();
		return normalized !== "#N/A" && normalized !== "N/A" && normalized !== "NA";
	};

	const getCardImage = (item) => {
		if (isValidLink(item.IMG)) return item.IMG;
		return (
			CATEGORY_PLACEHOLDERS[categoryId] || "../assets/placeholders/otr.webp"
		);
	};

	const hasMercadoLibreButton = (item) => {
		const normalizedStatus = String(item.STATUS_ML || "")
			.trim()
			.toUpperCase();
		return isValidLink(item.LINK) && normalizedStatus.startsWith("ACTIV");
	};

	const getWhatsAppHref = (item) => {
		const productName = item.NOMBRE || "producto";
		const message = `Hola, me interesa cotizar ${productName}`;
		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
	};

	const modalOverlay = document.createElement("div");
	modalOverlay.className = "product-modal-overlay";
	modalOverlay.innerHTML = `
		<div class="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
			<div class="product-modal-body">
				<div class="product-modal-image" id="product-modal-image"></div>
				<div class="product-modal-content">
					<div class="product-modal-head">
						<div>
							<h3 class="product-modal-title" id="product-modal-title"></h3>
							<span class="meta" id="product-modal-meta"></span>
						</div>
						<button type="button" class="product-modal-close" aria-label="Cerrar modal">×</button>
					</div>
					<span class="p-badge" id="product-modal-badge"></span>
					<div class="product-modal-info">
						<div class="product-modal-info-row" id="product-modal-specs"></div>
						<div class="price" id="product-modal-price"></div>
					</div>
					<div class="product-modal-actions" id="product-modal-actions"></div>
				</div>
			</div>
		</div>
	`;
	document.body.appendChild(modalOverlay);

	const modalCloseButton = modalOverlay.querySelector(".product-modal-close");

	const closeModal = () => modalOverlay.classList.remove("is-open");

	modalCloseButton.addEventListener("click", closeModal);
	modalOverlay.addEventListener("click", (event) => {
		if (event.target === modalOverlay) closeModal();
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeModal();
	});
	const toMoney = (value) => {
		if (!value) return "Sin precio";
		const numeric = Number(String(value).replace(/,/g, ""));
		if (Number.isNaN(numeric)) return "Sin precio";
		return new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 2,
		}).format(numeric);
	};

	const buildCard = (item) => {
		const article = document.createElement("article");
		article.className = "product";

		const badge = item.CLASE || item.APLICACION || "Producto";
		const meta =
			[item.MARCA, item.MODELO].filter(Boolean).join(" · ") ||
			item.APLICACION ||
			"Sin aplicación";

		const specs = [
			item.MEDIDA ? `<span class="spec">${item.MEDIDA}</span>` : "",
			item.CONSTRUCCION ? `<span class="spec">${item.CONSTRUCCION}</span>` : "",
			// item.EXISTENCIA !== null && item.EXISTENCIA !== undefined
			// 	? `<span class="spec">Stock: ${item.EXISTENCIA}</span>`
			// 	: "",
		]
			.filter(Boolean)
			.join("");

		const mlButtonHtml = hasMercadoLibreButton(item)
			? `<a class="btn buy-btn" href="${item.LINK}" target="_blank" rel="noopener noreferrer">${MERCADO_LIBRE_ICON}<span>Comprar</span></a>`
			: "";

		const whatsappButtonHtml = `<a class="btn primary whatsapp-btn" href="${getWhatsAppHref(
			item,
		)}" target="_blank" rel="noopener noreferrer">${WHATSAPP_ICON}<span>Cotizar</span></a>`;

		article.innerHTML = `
			<div class="p-img">
				<span class="p-badge">${badge}</span>
			</div>
			<div class="p-body">
				<b>${item.NOMBRE || "Producto"}</b>
				<span class="meta">${meta}</span>
				<div class="specs">${specs}</div>
				<div class="price-row">
					<div class="price">
						${toMoney(item.PRECIO_TIENDA)}
						<small>precio sugerido</small>
					</div>
				</div>
				<div class="actions">
					${mlButtonHtml}
					${whatsappButtonHtml}
				</div>
			</div>
		`;

		const imageUrl = getCardImage(item);
		article.querySelector(".p-img").style.backgroundImage =
			`url("${imageUrl}")`;

		article.addEventListener("click", (event) => {
			if (event.target.closest(".actions a")) return;

			const modalTitle = modalOverlay.querySelector("#product-modal-title");
			const modalMeta = modalOverlay.querySelector("#product-modal-meta");
			const modalBadge = modalOverlay.querySelector("#product-modal-badge");
			const modalSpecs = modalOverlay.querySelector("#product-modal-specs");
			const modalPrice = modalOverlay.querySelector("#product-modal-price");
			const modalImage = modalOverlay.querySelector("#product-modal-image");
			const modalActions = modalOverlay.querySelector("#product-modal-actions");

			modalTitle.textContent = item.NOMBRE || "Producto";
			modalMeta.textContent = meta;
			modalBadge.textContent = badge;
			modalPrice.innerHTML = `${toMoney(item.PRECIO_TIENDA)} <small>precio sugerido</small>`;
			modalImage.style.backgroundImage = `url("${imageUrl}")`;

			const infoChips = [
				item.MEDIDA ? `<span class="spec">Medida: ${item.MEDIDA}</span>` : "",
				item.CONSTRUCCION
					? `<span class="spec">Construcción: ${item.CONSTRUCCION}</span>`
					: "",
				item.APLICACION
					? `<span class="spec">Aplicación: ${item.APLICACION}</span>`
					: "",
				item.MARCA ? `<span class="spec">Marca: ${item.MARCA}</span>` : "",
			]
				.filter(Boolean)
				.join("");
			modalSpecs.innerHTML =
				infoChips || '<span class="spec">Sin información adicional</span>';

			modalActions.innerHTML = `${mlButtonHtml}${whatsappButtonHtml}`;
			modalOverlay.classList.add("is-open");
		});

		return article;
	};

	const matchesRule = (item) => {
		const byAplicacion =
			!rule.aplicaciones || rule.aplicaciones.includes(item.APLICACION);
		const byClase = !rule.clases || rule.clases.includes(item.CLASE);
		return byAplicacion && byClase;
	};

	fetch("../assets/data/data.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("No se pudo cargar data.json");
			}
			return response.json();
		})
		.then((data) => {
			const products = data
				.filter(matchesRule)
				.sort((a, b) => (b.EXISTENCIA || 0) - (a.EXISTENCIA || 0))
				.slice(0, rule.limit || 9);

			grid.innerHTML = "";

			if (!products.length) {
				grid.innerHTML = `
					<article class="product">
						<div class="p-body">
							<b>Sin resultados</b>
							<span class="meta">No encontramos productos para esta categoría.</span>
						</div>
					</article>
				`;
				return;
			}

			products.forEach((item) => grid.appendChild(buildCard(item)));
		})
		.catch(() => {
			grid.innerHTML = `
				<article class="product">
					<div class="p-body">
						<b>No fue posible cargar productos</b>
						<span class="meta">Intenta recargar la página.</span>
					</div>
				</article>
			`;
		});
})();
