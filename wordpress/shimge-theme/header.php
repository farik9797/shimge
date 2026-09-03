<?php
/**
 * The Header for SHIMGE theme
 *
 * @package SHIMGE_Uzbekistan
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#0096A6] selection:text-white flex flex-col' ); ?>>
<?php wp_body_open(); ?>

<header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
    
    <!-- Top Utility Bar -->
    <div className="bg-[#F0FAFA] text-slate-600 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#D4F1F4]" style="background-color: #F0FAFA; border-bottom: 1px solid #D4F1F4; padding: 6px 16px;">
        <div class="max-w-7xl mx-auto flex justify-between items-center text-xs">
            <div class="flex items-center space-x-3">
                <span class="font-bold text-slate-800 flex items-center space-x-1.5">
                    <span class="inline-block w-2 h-2 rounded-full bg-[#00A859] mr-1"></span>
                    <span>SHIMGE PUMP UZBEKISTAN • Каталог насосного оборудования</span>
                </span>
                <span class="hidden md:inline text-slate-300">|</span>
                <span class="hidden md:inline-flex items-center text-slate-500">
                    г. Ташкент, Алмазарский район
                </span>
            </div>

            <div class="flex items-center space-x-4 text-xs font-semibold">
                <a href="https://t.me/Rustamshimge" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center text-[#229ED9] hover:underline">
                    <span>Telegram</span>
                </a>
                <a href="tel:+998977433738" class="text-[#0096A6] hover:text-[#007682] font-bold flex items-center">
                    <span>+998 97 743 37 38</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center justify-between gap-4">
            
            <!-- Logo -->
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center space-x-3 flex-shrink-0 group">
                <img 
                    src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/shimge-logo.png' ); ?>" 
                    alt="SHIMGE for better life" 
                    class="h-9 sm:h-10 w-auto object-contain" 
                />
                <div class="hidden sm:block pl-3 border-l border-slate-200 leading-tight">
                    <span class="font-extrabold text-slate-900 text-xs tracking-tight block">УЗБЕКИСТАН</span>
                    <span class="text-[10px] text-slate-400 font-semibold">Официальный каталог</span>
                </div>
            </a>

            <!-- Navigation Links -->
            <nav class="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-700">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-[#0096A6] transition-colors <?php echo is_front_page() ? 'text-[#0096A6]' : ''; ?>">Главная</a>
                <a href="<?php echo esc_url( home_url( '/catalog/' ) ); ?>" class="hover:text-[#0096A6] transition-colors <?php echo is_page('catalog') || is_shop() ? 'text-[#0096A6]' : ''; ?>">Каталог насосов</a>
                <a href="<?php echo esc_url( home_url( '/industries/' ) ); ?>" class="hover:text-[#0096A6] transition-colors <?php echo is_page('industries') ? 'text-[#0096A6]' : ''; ?>">Отраслевые решения</a>
                <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="hover:text-[#0096A6] transition-colors <?php echo is_page('about') ? 'text-[#0096A6]' : ''; ?>">О бренде SHIMGE</a>
                <a href="<?php echo esc_url( home_url( '/delivery/' ) ); ?>" class="hover:text-[#0096A6] transition-colors <?php echo is_page('delivery') ? 'text-[#0096A6]' : ''; ?>">Доставка и оплата</a>
                <a href="<?php echo esc_url( home_url( '/contacts/' ) ); ?>" class="hover:text-[#0096A6] transition-colors <?php echo is_page('contacts') ? 'text-[#0096A6]' : ''; ?>">Контакты</a>
            </nav>

            <!-- Actions -->
            <div class="flex items-center space-x-2.5">
                <!-- Specification Drawer Button -->
                <button 
                    onclick="window.shimgeOpenCart && window.shimgeOpenCart()" 
                    class="relative flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#EBF8F9] hover:text-[#0096A6] text-slate-800 text-xs font-bold transition-colors"
                >
                    <i data-lucide="file-text" class="w-4 h-4 text-slate-600"></i>
                    <span class="hidden sm:inline">Спецификация</span>
                    <span id="header-cart-badge" class="hidden bg-[#00A859] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">0</span>
                </button>

                <!-- RFQ Quote Button -->
                <button 
                    onclick="window.shimgeOpenRfq && window.shimgeOpenRfq()" 
                    class="bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
                >
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    <span>Запросить КП</span>
                </button>
            </div>

        </div>
    </div>

</header>
<main class="flex-1">
