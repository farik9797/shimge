<?php
/**
 * Template Name: О бренде SHIMGE
 *
 * @package SHIMGE_Uzbekistan
 */

get_header(); ?>

<div class="bg-slate-50 min-h-screen pb-16">
    <div class="bg-white py-12 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-2">
            <div class="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider bg-[#EBF8F9] px-3.5 py-1 rounded-full border border-[#B5E7EC]">
                <i data-lucide="award" class="w-4 h-4 text-[#0096A6]"></i>
                <span>О бренде SHIMGE Pump Industry</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Мировой лидер в производстве насосного оборудования с 1984 года
            </h1>
            <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                40 лет инноваций, более 10 000 000 насосов ежегодно, экспорт в 100+ стран мира и официальное присутствие в Узбекистане.
            </p>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <!-- Factory HQ Image Block -->
        <div class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-7 space-y-4">
                    <h2 class="text-2xl font-black text-slate-900 leading-tight">
                        Штаб-квартира и производственные комплексы SHIMGE
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Компания <strong>SHIMGE Pump Industry (Group) Co., Ltd.</strong> основана в 1984 году в городе Вэньлин — сердце насосостроения Азии. Сегодня SHIMGE включает несколько высокотехнологичных заводов с роботизированными линиями сборки, автоматическим контролем литья и лабораторией государственного уровня CNAS.
                    </p>
                    <div class="space-y-2 text-xs text-slate-700">
                        <div class="flex items-center space-x-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00A859]"></i>
                            <span>Участие в разработке более 30 национальных и международных стандартов</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00A859]"></i>
                            <span>Сертификация ISO 9001, ISO 14001, CE, RoHS и O'zStandart в Узбекистане</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00A859]"></i>
                            <span>Складской запас и официальный сервисный центр в Ташкенте</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5">
                    <div class="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group">
                        <img
                            src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/shimge-factory-hq.jpg' ); ?>"
                            alt="Главный производственный комплекс и штаб-квартира SHIMGE Pump Industry"
                            class="w-full h-80 object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
