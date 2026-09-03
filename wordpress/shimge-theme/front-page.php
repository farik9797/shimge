<?php
/**
 * Front Page Template
 *
 * @package SHIMGE_Uzbekistan
 */

get_header(); ?>

<!-- 1. Hero Section (RIVR Style Floating Container with Autoplaying Background Video) -->
<div class="w-full bg-[#F4F6F8] p-2.5 sm:p-4 lg:p-5 border-b border-slate-200">
    <div class="relative mx-auto w-full max-w-[1536px] min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16">
        
        <!-- Background Video with Crop Scaling -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <div class="absolute -top-[25%] -bottom-[25%] -left-[25%] -right-[25%] w-[150%] h-[150%] flex items-center justify-center pointer-events-none">
                <iframe
                    src="https://www.youtube-nocookie.com/embed/iJ2P0HwvjGA?autoplay=1&mute=1&loop=1&playlist=iJ2P0HwvjGA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&playsinline=1&enablejsapi=1"
                    title="SHIMGE Video Background"
                    class="w-full h-full min-w-[120vw] min-h-[70vw] pointer-events-none border-0 object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/55"></div>
        </div>

        <!-- Headline & CTAs -->
        <div class="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6">
            <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.08] text-white drop-shadow-lg">
                Инженерная надежность <br />
                <span class="text-[#00D1E5] drop-shadow-md">в каждом метре напора</span>
            </h1>

            <p class="text-sm sm:text-base lg:text-lg text-slate-100/90 font-medium max-w-2xl leading-relaxed drop-shadow-md">
                Официальный каталог насосного оборудования <strong>SHIMGE</strong> в Узбекистане: промышленные, скважинные и циркуляционные насосы со склада в Ташкенте.
            </p>

            <div class="pt-2 flex flex-wrap items-center justify-center gap-3.5">
                <a
                    href="<?php echo esc_url( home_url( '/catalog/' ) ); ?>"
                    class="group inline-flex items-center gap-3 rounded-full bg-[#0096A6] hover:bg-[#007682] py-2.5 pe-2.5 ps-7 text-sm font-bold text-white shadow-xl shadow-black/30 hover:scale-103 transition-all duration-200"
                >
                    <span>Открыть каталог</span>
                    <span class="flex w-8 h-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-all">
                        <i data-lucide="arrow-up-right" class="w-4 h-4 text-white"></i>
                    </span>
                </a>

                <button
                    onclick="window.shimgeOpenRfq && window.shimgeOpenRfq()"
                    class="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 hover:bg-white/30 text-white px-6 py-3 text-sm font-bold backdrop-blur-md shadow-lg transition-all hover:scale-103"
                >
                    <i data-lucide="send" class="w-3.5 h-3.5 text-[#00D1E5]"></i>
                    <span>Запросить расчет и КП</span>
                </button>
            </div>
        </div>

    </div>
</div>

<!-- 2. Popular Products on Stock -->
<section class="py-14 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
            <div>
                <div class="flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-1.5">
                    <i data-lucide="flame" class="w-4 h-4 text-amber-500"></i>
                    <span>Популярные позиции на складе</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Складские позиции насосов SHIMGE в Ташкенте
                </h2>
            </div>

            <div class="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full flex-shrink-0">
                <a href="<?php echo esc_url( home_url( '/catalog/' ) ); ?>" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#0096A6] text-white shadow-2xs">Все серии</a>
                <a href="<?php echo esc_url( home_url( '/catalog/?category=multistage-vertical' ) ); ?>" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950">BLT (Многоступенчатые)</a>
                <a href="<?php echo esc_url( home_url( '/catalog/?category=submersible-wells' ) ); ?>" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950">4SGm (Скважинные)</a>
                <a href="<?php echo esc_url( home_url( '/catalog/?category=drainage-sewage' ) ); ?>" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950">WQ (Фекальные)</a>
                <a href="<?php echo esc_url( home_url( '/catalog/?category=circulation-hvac' ) ); ?>" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950">APM (Циркуляционные)</a>
            </div>
        </div>

        <!-- Static / WooCommerce Featured Pumps Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- Card 1: BLT 16-8 -->
            <div class="bg-white rounded-3xl border border-slate-200 hover:border-[#0096A6] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div>
                    <div class="relative h-56 bg-slate-50/70 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                        <img src="https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-22-36-552393-238ee32a0a85c96fad061c7123a0b9c7.webp?_=ozauc" alt="SHIMGE BLT 16-8" class="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500" />
                        <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1 shadow-2xs">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00A859]"></span>
                            <span>В наличии (14 шт.)</span>
                        </div>
                        <div class="absolute top-3 right-3 bg-[#0096A6] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">BLT</div>
                    </div>
                    <div class="p-5 space-y-3">
                        <div>
                            <span class="text-[10px] font-mono font-bold text-slate-400 block">BLT-16-8-11KW</span>
                            <h3 class="text-sm font-bold text-slate-900 group-hover:text-[#0096A6] transition-colors line-clamp-2 min-h-[40px]">
                                Вертикальный многоступенчатый насос SHIMGE BLT 16-8 (AISI 304)
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                            <div><span class="text-[10px] text-slate-400 block">Напор H:</span><span class="font-black text-slate-900">110 м</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Подача Q:</span><span class="font-black text-slate-900">16 м³/ч</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Мощность:</span><span class="font-bold text-slate-800">11.0 кВт</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Корпус:</span><span class="font-bold text-slate-800">AISI 304</span></div>
                        </div>
                    </div>
                </div>
                <div class="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                        <span class="text-[9px] text-slate-400 block uppercase font-bold">Оптовая цена</span>
                        <span class="text-sm font-black text-[#0096A6]">22 500 000 сум</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick='window.shimgeAddToCart({id:"blt-16-8", name:"SHIMGE BLT 16-8 (AISI 304)", sku:"BLT-16-8-11KW", series:"BLT", price:"22 500 000 сум", image:"https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-22-36-552393-238ee32a0a85c96fad061c7123a0b9c7.webp?_=ozauc", head:"110 м", flow:"16 м³/ч", power:"11 кВт", material:"AISI 304", category:"Многоступенчатые"})' class="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center" title="В спецификацию">
                            <i data-lucide="plus" class="w-4 h-4 text-[#0096A6]"></i>
                        </button>
                        <button onclick="window.shimgeOpenRfq('SHIMGE BLT 16-8')" class="h-10 bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 rounded-xl flex items-center space-x-1.5 shadow-2xs whitespace-nowrap">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                            <span>Запрос КП</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Card 2: 4SGm 4/14 -->
            <div class="bg-white rounded-3xl border border-slate-200 hover:border-[#0096A6] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div>
                    <div class="relative h-56 bg-slate-50/70 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                        <img src="https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-23-22-188062-b3b0f41c79048ada0fc9ef2d77f23d15.webp?_=ozauc" alt="SHIMGE 4SGm 4/14" class="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500" />
                        <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1 shadow-2xs">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00A859]"></span>
                            <span>В наличии (28 шт.)</span>
                        </div>
                        <div class="absolute top-3 right-3 bg-[#0096A6] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">4SGm</div>
                    </div>
                    <div class="p-5 space-y-3">
                        <div>
                            <span class="text-[10px] font-mono font-bold text-slate-400 block">4SGm4/14-1.1KW</span>
                            <h3 class="text-sm font-bold text-slate-900 group-hover:text-[#0096A6] transition-colors line-clamp-2 min-h-[40px]">
                                Скважинный глубинный насос SHIMGE 4SGm 4/14 (Пескостойкий)
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                            <div><span class="text-[10px] text-slate-400 block">Напор H:</span><span class="font-black text-slate-900">102 м</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Подача Q:</span><span class="font-black text-slate-900">6.0 м³/ч</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Мощность:</span><span class="font-bold text-slate-800">1.1 кВт</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Корпус:</span><span class="font-bold text-slate-800">AISI 304</span></div>
                        </div>
                    </div>
                </div>
                <div class="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                        <span class="text-[9px] text-slate-400 block uppercase font-bold">Оптовая цена</span>
                        <span class="text-sm font-black text-[#0096A6]">3 450 000 сум</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick='window.shimgeAddToCart({id:"4sgm-4-14", name:"SHIMGE 4SGm 4/14", sku:"4SGm4/14-1.1KW", series:"4SGm", price:"3 450 000 сум", image:"https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-23-22-188062-b3b0f41c79048ada0fc9ef2d77f23d15.webp?_=ozauc", head:"102 м", flow:"6.0 м³/ч", power:"1.1 кВт", material:"AISI 304", category:"Скважинные"})' class="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center" title="В спецификацию">
                            <i data-lucide="plus" class="w-4 h-4 text-[#0096A6]"></i>
                        </button>
                        <button onclick="window.shimgeOpenRfq('SHIMGE 4SGm 4/14')" class="h-10 bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 rounded-xl flex items-center space-x-1.5 shadow-2xs whitespace-nowrap">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                            <span>Запрос КП</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Card 3: WQD 10-10 CUT -->
            <div class="bg-white rounded-3xl border border-slate-200 hover:border-[#0096A6] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div>
                    <div class="relative h-56 bg-slate-50/70 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
                        <img src="https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80" alt="SHIMGE WQD 10-10 CUT" class="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500" />
                        <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1 shadow-2xs">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00A859]"></span>
                            <span>В наличии (35 шт.)</span>
                        </div>
                        <div class="absolute top-3 right-3 bg-[#0096A6] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">WQ</div>
                    </div>
                    <div class="p-5 space-y-3">
                        <div>
                            <span class="text-[10px] font-mono font-bold text-slate-400 block">WQD-10-10-0.75</span>
                            <h3 class="text-sm font-bold text-slate-900 group-hover:text-[#0096A6] transition-colors line-clamp-2 min-h-[40px]">
                                Фекальный насос с режущим ножом SHIMGE WQD 10-10 CUT (Z-Cut)
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                            <div><span class="text-[10px] text-slate-400 block">Напор H:</span><span class="font-black text-slate-900">14 м</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Подача Q:</span><span class="font-black text-slate-900">16.0 м³/ч</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Мощность:</span><span class="font-bold text-slate-800">0.75 кВт</span></div>
                            <div><span class="text-[10px] text-slate-400 block">Корпус:</span><span class="font-bold text-slate-800">Чугун HT200</span></div>
                        </div>
                    </div>
                </div>
                <div class="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                        <span class="text-[9px] text-slate-400 block uppercase font-bold">Оптовая цена</span>
                        <span class="text-sm font-black text-[#0096A6]">2 750 000 сум</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick='window.shimgeAddToCart({id:"wqd-10-10", name:"SHIMGE WQD 10-10 CUT", sku:"WQD-10-10-0.75", series:"WQ", price:"2 750 000 сум", image:"https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80", head:"14 м", flow:"16.0 м³/ч", power:"0.75 кВт", material:"Чугун HT200", category:"Фекальные"})' class="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center" title="В спецификацию">
                            <i data-lucide="plus" class="w-4 h-4 text-[#0096A6]"></i>
                        </button>
                        <button onclick="window.shimgeOpenRfq('SHIMGE WQD 10-10 CUT')" class="h-10 bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 rounded-xl flex items-center space-x-1.5 shadow-2xs whitespace-nowrap">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                            <span>Запрос КП</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <div class="mt-10 text-center">
            <a href="<?php echo esc_url( home_url( '/catalog/' ) ); ?>" class="inline-flex items-center space-x-2 bg-white hover:bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-2xs group">
                <span>Смотреть весь официальный каталог SHIMGE (24+ модели)</span>
                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </a>
        </div>

    </div>
</section>

<!-- 3. Lead Form Section -->
<section class="py-14 bg-white relative overflow-hidden border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-[#EBF8F9]/80 via-slate-50 to-emerald-50/50 border border-[#B5E7EC] rounded-3xl p-6 sm:p-10 shadow-md">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div class="lg:col-span-5 space-y-5">
                    <div class="inline-flex items-center space-x-2 bg-white border border-[#B5E7EC] text-[#0096A6] px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                        <i data-lucide="award" class="w-4 h-4 text-[#00A859]"></i>
                        <span>Оптовый отдел SHIMGE Uzbekistan</span>
                    </div>

                    <h2 class="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                        Запросите оптовый прайс-лист и коммерческое предложение
                    </h2>

                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Официальные дилерские скидки для строительных и монтажных организаций, ЖКХ, водоканалов и агрокомплексов.
                    </p>

                    <div class="space-y-2.5 pt-1 text-xs text-slate-700 font-medium">
                        <div class="flex items-center space-x-2.5">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00A859]"></i>
                            <span>Договор и оплата с НДС 12% (электронные счета-фактуры)</span>
                        </div>
                        <div class="flex items-center space-x-2.5">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00A859]"></i>
                            <span>Бесплатный расчет рабочей точки и подбор оборудования</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-200">
                    <form onsubmit="event.preventDefault(); window.shimgeShowToast('Заявка принята! Инженер свяжется с вами.'); this.reset();" class="space-y-4">
                        <h3 class="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                            Быстрый расчет оборудования:
                        </h3>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">Компания / Ваше имя *</label>
                                <input type="text" required placeholder="ООО или Ф.И.О." class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">Телефон для связи *</label>
                                <input type="tel" required placeholder="+998 (9_) ___ - __ - __" class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Требуемые параметры или комментарий</label>
                            <textarea rows="2" placeholder="Напор H, подача Q, модель насоса или город доставки..." class="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none"></textarea>
                        </div>

                        <button type="submit" class="w-full bg-[#0096A6] hover:bg-[#007682] text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-xs flex items-center justify-center space-x-2">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                            <span>Запросить официальный расчет и КП</span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
