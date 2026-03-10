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

	const isValidLink = (link) => {
		if (!link) return false;
		const normalized = String(link).trim().toUpperCase();
		return normalized !== "#N/A" && normalized !== "N/A" && normalized !== "NA";
	};

	const hasMercadoLibreButton = (item) =>
		isValidLink(item.LINK) && String(item.STATUS_ML || "").trim() === "Activo";

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
			? `<a class="btn" href="${item.LINK}" target="_blank" rel="noopener noreferrer">Mercado Libre</a>`
			: "";

		const whatsappButtonHtml = `<a class="btn primary" href="${getWhatsAppHref(
			item
		)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>`;

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
