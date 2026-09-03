/**
 * SHIMGE Uzbekistan Core Frontend Engine
 * Specification Cart, Excel Export, RFQ Modal, Q-H Calculator
 */

(function($) {
    'use strict';

    // 1. Specification Cart State (localStorage)
    const STORAGE_KEY = 'shimge_spec_cart_wp';
    
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        updateCartUI();
    }

    window.shimgeAddToCart = function(product) {
        let cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                sku: product.sku || '',
                series: product.series || 'SHIMGE',
                price: product.price || 'По запросу',
                image: product.image || '',
                head: product.head || '',
                flow: product.flow || '',
                power: product.power || '',
                material: product.material || '',
                category: product.category || '',
                quantity: 1
            });
        }
        saveCart(cart);
        shimgeShowToast('«' + product.name + '» добавлен в спецификацию!');
    };

    window.shimgeUpdateQty = function(id, delta) {
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            saveCart(cart);
        }
    };

    window.shimgeRemoveFromCart = function(id) {
        let cart = getCart().filter(i => i.id !== id);
        saveCart(cart);
    };

    window.shimgeClearCart = function() {
        saveCart([]);
    };

    function updateCartUI() {
        const cart = getCart();
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Header badge
        const badge = document.getElementById('header-cart-badge');
        if (badge) {
            badge.innerText = totalCount;
            badge.style.display = totalCount > 0 ? 'flex' : 'none';
        }

        // Render Drawer if open
        const drawerBody = document.getElementById('shimge-drawer-items');
        const drawerTotal = document.getElementById('shimge-drawer-total');
        if (drawerBody) {
            if (cart.length === 0) {
                drawerBody.innerHTML = `
                    <div class="text-center py-16 space-y-3">
                        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <i data-lucide="shopping-bag" class="w-8 h-8"></i>
                        </div>
                        <h4 class="text-sm font-bold text-slate-700">Спецификация пуста</h4>
                        <p class="text-xs text-slate-500 max-w-xs mx-auto">
                            Выберите насосы SHIMGE в каталоге и добавьте их кнопкой «В спецификацию».
                        </p>
                    </div>
                `;
            } else {
                drawerBody.innerHTML = cart.map(item => `
                    <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 hover:bg-white transition-colors">
                        <div class="flex items-center space-x-3 min-w-0">
                            <img src="${item.image}" alt="" class="w-12 h-12 object-contain rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0" />
                            <div class="min-w-0">
                                <span class="text-[9px] font-black uppercase text-[#007682] bg-[#EBF8F9] border border-[#B5E7EC] px-1.5 py-0.5 rounded">${item.series}</span>
                                <h5 class="text-xs font-bold text-slate-900 truncate mt-0.5">${item.name}</h5>
                                <span class="text-[11px] font-bold text-[#0096A6]">${item.price}</span>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 flex-shrink-0">
                            <div class="flex items-center border border-slate-300 rounded-xl bg-white p-0.5">
                                <button onclick="shimgeUpdateQty('${item.id}', -1)" class="p-1 text-slate-500 hover:text-slate-900 rounded-lg"><i data-lucide="minus" class="w-3 h-3"></i></button>
                                <span class="px-2 text-xs font-black text-slate-900">${item.quantity}</span>
                                <button onclick="shimgeUpdateQty('${item.id}', 1)" class="p-1 text-slate-500 hover:text-slate-900 rounded-lg"><i data-lucide="plus" class="w-3 h-3"></i></button>
                            </div>
                            <button onclick="shimgeRemoveFromCart('${item.id}')" class="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                `).join('');
            }

            if (drawerTotal) {
                drawerTotal.innerText = totalCount + ' шт.';
            }

            if (window.lucide) window.lucide.createIcons();
        }
    }

    // 2. Excel Export (.xls) with Clean Columns
    window.shimgeExportExcel = function() {
        const cart = getCart();
        if (cart.length === 0) {
            shimgeShowToast('Спецификация пуста, добавьте товары');
            return;
        }

        const dateStr = new Date().toLocaleDateString('ru-RU');
        const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        const excelHtml = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style>
                    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; }
                    .title { font-size: 16pt; font-weight: bold; color: #007682; }
                    th { background-color: #0096A6; color: #FFFFFF; font-weight: bold; text-align: center; border: 1px solid #007682; padding: 8px; }
                    td { border: 1px solid #CBD5E1; padding: 6px; }
                    .center { text-align: center; }
                    .total { background-color: #EBF8F9; font-weight: bold; color: #007682; }
                </style>
            </head>
            <body>
                <table>
                    <tr><td colspan="11" class="title">СПЕЦИФИКАЦИЯ НАСОСНОГО ОБОРУДОВАНИЯ SHIMGE UZBEKISTAN</td></tr>
                    <tr><td colspan="11">Дата: ${dateStr} ${timeStr} | Поставщик: ООО «Gidromaks Pro», г. Ташкент | Тел: +998 97 743 37 38</td></tr>
                    <tr><td colspan="11"></td></tr>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Серия</th>
                            <th>Артикул (SKU)</th>
                            <th>Наименование оборудования</th>
                            <th>Категория</th>
                            <th>Напор H (м)</th>
                            <th>Подача Q (м³/ч)</th>
                            <th>Мощность (кВт)</th>
                            <th>Материал</th>
                            <th>Кол-во (шт)</th>
                            <th>Оптовая цена (сум)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map((item, idx) => `
                            <tr>
                                <td class="center">${idx + 1}</td>
                                <td class="center"><b>${item.series}</b></td>
                                <td>${item.sku}</td>
                                <td>${item.name}</td>
                                <td>${item.category}</td>
                                <td class="center">${item.head}</td>
                                <td class="center">${item.flow}</td>
                                <td class="center">${item.power}</td>
                                <td>${item.material}</td>
                                <td class="center"><b>${item.quantity}</b></td>
                                <td style="text-align:right;">${item.price}</td>
                            </tr>
                        `).join('')}
                        <tr class="total">
                            <td colspan="9" style="text-align:right;">ИТОГО ЕДИНИЦ ОБОРУДОВАНИЯ:</td>
                            <td class="center"><b>${totalItemsCount} шт.</b></td>
                            <td style="text-align:right;">(с НДС 12%)</td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
        `;

        const blob = new Blob(['\uFEFF' + excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SHIMGE_Specifikaciya_${dateStr.replace(/\./g, '_')}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        shimgeShowToast('Файл Excel успешно сформирован и загружен!');
    };

    // 3. Modals & Drawer Open/Close Handlers
    window.shimgeOpenCart = function() {
        renderDrawerDOM();
        updateCartUI();
        document.getElementById('shimge-cart-drawer')?.classList.remove('hidden');
    };

    window.shimgeCloseCart = function() {
        document.getElementById('shimge-cart-drawer')?.classList.add('hidden');
    };

    window.shimgeOpenRfq = function(productName) {
        renderRfqDOM(productName || '');
        document.getElementById('shimge-rfq-modal')?.classList.remove('hidden');
    };

    window.shimgeCloseRfq = function() {
        document.getElementById('shimge-rfq-modal')?.classList.add('hidden');
    };

    window.shimgeShowToast = function(msg) {
        let toast = document.getElementById('shimge-global-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'shimge-global-toast';
            toast.className = 'fixed bottom-5 left-5 z-50 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-2xl flex items-center space-x-2 border border-slate-700 transition-all duration-300';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#00A859]"></span><span>${msg}</span>`;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
        }, 3000);
    };

    function renderDrawerDOM() {
        let drawer = document.getElementById('shimge-cart-drawer');
        if (!drawer) {
            drawer = document.createElement('div');
            drawer.id = 'shimge-cart-drawer';
            drawer.className = 'fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end';
            drawer.innerHTML = `
                <div class="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
                    <div class="bg-[#F0FAFA] px-6 py-4 border-b border-[#D4F1F4] flex items-center justify-between flex-shrink-0">
                        <div class="flex items-center space-x-2.5">
                            <div class="w-9 h-9 rounded-xl bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] flex items-center justify-center">
                                <i data-lucide="file-text" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-slate-900">Спецификация & Корзина</h3>
                                <p class="text-[11px] text-slate-500">Выбрано: <span id="shimge-drawer-total">0 шт.</span></p>
                            </div>
                        </div>
                        <button onclick="shimgeCloseCart()" class="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <div id="shimge-drawer-items" class="flex-1 overflow-y-auto p-6 space-y-3"></div>
                    <div class="p-6 bg-slate-50 border-t border-slate-200 space-y-3 flex-shrink-0">
                        <div class="grid grid-cols-2 gap-2.5">
                            <button onclick="shimgeExportExcel()" class="py-3 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-2xs">
                                <i data-lucide="file-spreadsheet" class="w-4 h-4 text-emerald-600"></i>
                                <span>Скачать в Excel</span>
                            </button>
                            <button onclick="shimgeCloseCart(); shimgeOpenRfq();" class="py-3 px-3 bg-[#0096A6] hover:bg-[#007682] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md">
                                <i data-lucide="send" class="w-3.5 h-3.5"></i>
                                <span>Запросить КП</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(drawer);
            if (window.lucide) window.lucide.createIcons();
        }
    }

    function renderRfqDOM(targetProduct) {
        let modal = document.getElementById('shimge-rfq-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'shimge-rfq-modal';
            modal.className = 'fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6';
            modal.innerHTML = `
                <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full flex flex-col overflow-hidden">
                    <div class="bg-[#F0FAFA] text-slate-900 px-6 py-4 flex items-center justify-between border-b border-[#D4F1F4]">
                        <div>
                            <h3 class="text-sm font-bold text-slate-900" id="rfq-title">Запрос коммерческого предложения</h3>
                            <p class="text-[11px] text-slate-500">Официальный расчет цен и сроков поставки оборудования SHIMGE</p>
                        </div>
                        <button onclick="shimgeCloseRfq()" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>
                    <form id="shimge-rfq-form" class="p-6 space-y-4">
                        <input type="hidden" id="rfq-product-input" value="" />
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">Компания / Ваше имя *</label>
                                <input type="text" id="rfq-company" required placeholder="ООО или Ф.И.О." class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6]" />
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">Телефон для связи *</label>
                                <input type="tel" id="rfq-phone" required placeholder="+998 (90) ___ - __ - __" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6]" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Email для отправки КП</label>
                            <input type="email" id="rfq-email" placeholder="zakupki@company.uz" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6]" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Комментарий или список оборудования</label>
                            <textarea id="rfq-comment" rows="2" placeholder="Параметры напора/подачи, количество..." class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6]"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-[#0096A6] hover:bg-[#007682] text-white font-bold py-3 rounded-2xl shadow-md transition-all text-xs flex items-center justify-center space-x-2">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                            <span>Отправить запрос на КП</span>
                        </button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);

            $('#shimge-rfq-form').on('submit', function(e) {
                e.preventDefault();
                const btn = $(this).find('button[type="submit"]');
                btn.prop('disabled', true).text('Отправка...');
                
                $.post((window.shimge_ajax ? window.shimge_ajax.ajax_url : '/wp-admin/admin-ajax.php'), {
                    action: 'shimge_rfq',
                    nonce: (window.shimge_ajax ? window.shimge_ajax.nonce : ''),
                    company: $('#rfq-company').val(),
                    phone: $('#rfq-phone').val(),
                    email: $('#rfq-email').val(),
                    comment: $('#rfq-comment').val(),
                    product: $('#rfq-product-input').val()
                }, function(res) {
                    btn.prop('disabled', false).html('<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Отправить запрос на КП</span>');
                    shimgeCloseRfq();
                    shimgeShowToast('Заявка на КП успешно отправлена инженеру SHIMGE!');
                }).fail(function() {
                    btn.prop('disabled', false).html('<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Отправить запрос на КП</span>');
                    shimgeCloseRfq();
                    shimgeShowToast('Заявка принята! Инженер свяжется с вами.');
                });
            });

            if (window.lucide) window.lucide.createIcons();
        }

        if (targetProduct) {
            $('#rfq-title').text('Запрос КП на «' + targetProduct + '»');
            $('#rfq-product-input').val(targetProduct);
        } else {
            $('#rfq-title').text('Запрос коммерческого предложения');
            $('#rfq-product-input').val('');
        }
    }

    $(document).ready(function() {
        updateCartUI();
    });

})(jQuery);
