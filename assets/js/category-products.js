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

	const grid = document.querySelector("section.grid");
	if (!grid) return;

	const WHATSAPP_NUMBER = "524441449905";
	const WHATSAPP_ICON = `
		<span class="btn-icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" role="img" focusable="false">
				<path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.52 0 .2 5.32.2 11.87c0 2.1.55 4.15 1.6 5.96L0 24l6.33-1.75a11.82 11.82 0 0 0 5.74 1.47h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.43-8.37Zm-8.45 18.24h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.76 1.04 1-3.67-.24-.38a9.85 9.85 0 0 1-1.5-5.24c0-5.43 4.42-9.85 9.86-9.85 2.62 0 5.09 1.02 6.95 2.89a9.8 9.8 0 0 1 2.89 6.96c0 5.43-4.43 9.84-9.86 9.84Zm5.4-7.37c-.3-.16-1.78-.88-2.06-.98-.27-.1-.47-.16-.67.16-.2.3-.77.97-.95 1.17-.18.2-.36.22-.66.08-.3-.16-1.28-.47-2.43-1.5a8.97 8.97 0 0 1-1.68-2.07c-.18-.31-.02-.48.14-.64.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.54-.08-.16-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.04-1.05 2.53s1.07 2.94 1.22 3.14c.15.2 2.1 3.2 5.07 4.49.71.3 1.27.48 1.71.61.72.23 1.38.2 1.9.12.58-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.27-.2-.57-.35Z" />
			</svg>
		</span>`;
	const MERCADO_LIBRE_ICON = `
		<span class="btn-icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" role="img" focusable="false">
				<ellipse cx="12" cy="12" rx="10.5" ry="7.5"></ellipse>
				<path d="M8.3 11.1c.8 0 1.3.4 1.8.9.5-.5 1-.9 1.9-.9.8 0 1.4.4 1.9.9.5-.5 1-.9 1.8-.9.9 0 1.6.7 1.6 1.6 0 .8-.5 1.4-1.2 1.6l-2.5.7c-.5.1-1 .1-1.5 0l-1.1-.3-1.1.3c-.5.1-1 .1-1.5 0l-2.5-.7c-.7-.2-1.2-.8-1.2-1.6 0-.9.7-1.6 1.6-1.6Zm1.5 1.2-.2.2c-.3.3-.7.5-1.1.5-.3 0-.6-.1-.8-.2-.2-.1-.4.1-.4.3 0 .2.1.3.3.4l2.5.7c.3.1.7.1 1 0l1.2-.3.9-.2.9.2 1.2.3c.3.1.7.1 1 0l2.5-.7c.2-.1.3-.2.3-.4 0-.2-.2-.4-.4-.3-.2.1-.5.2-.8.2-.4 0-.8-.2-1.1-.5l-.2-.2-.2.2c-.4.4-1 .7-1.6.7-.7 0-1.2-.3-1.7-.7l-.2-.2-.2.2c-.4.4-1 .7-1.7.7s-1.2-.3-1.6-.7l-.2-.2Z"></path>
			</svg>
		</span>`;

	const isValidLink = (link) => {
		if (!link) return false;
		const normalized = String(link).trim().toUpperCase();
		return normalized !== "#N/A" && normalized !== "N/A" && normalized !== "NA";
	};

	const hasMercadoLibreButton = (item) => {
		const normalizedStatus = String(item.STATUS_ML || "").trim().toUpperCase();
		return isValidLink(item.LINK) && normalizedStatus.startsWith("ACTIV");
	};

	const getWhatsAppHref = (item) => {
		const productName = item.NOMBRE || "producto";
		const message = `Hola, me interesa cotizar ${productName}`;
		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
	};
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
			? `<a class="btn" href="${item.LINK}" target="_blank" rel="noopener noreferrer">${MERCADO_LIBRE_ICON}<span>Mercado Libre</span></a>`
			: "";

		const whatsappButtonHtml = `<a class="btn primary" href="${getWhatsAppHref(
			item
		)}" target="_blank" rel="noopener noreferrer">${WHATSAPP_ICON}<span>WhatsApp</span></a>`;

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
