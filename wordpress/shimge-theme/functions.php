<?php
/**
 * SHIMGE Theme Functions & Definitions
 *
 * @package SHIMGE_Uzbekistan
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// 1. Theme Setup & WooCommerce Support
function shimge_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'woocommerce' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    register_nav_menus( array(
        'primary' => __( 'Главное меню', 'shimge' ),
        'footer'  => __( 'Меню подвала', 'shimge' ),
    ) );
}
add_action( 'after_setup_theme', 'shimge_theme_setup' );

// 2. Enqueue Scripts and Styles
function shimge_theme_scripts() {
    // Fonts
    wp_enqueue_style( 'shimge-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap', array(), null );
    
    // Tailwind CSS CDN for instant styling
    wp_enqueue_script( 'tailwind-cdn', 'https://cdn.tailwindcss.com', array(), '3.4.1', false );
    wp_add_inline_script( 'tailwind-cdn', "
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        shimge: {
                            50: '#EBF8F9',
                            100: '#D4F1F4',
                            200: '#B5E7EC',
                            500: '#0096A6',
                            600: '#007682',
                            cyan: '#00D1E5',
                            green: '#00A859'
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace']
                    }
                }
            }
        }
    " );

    // Lucide Icons
    wp_enqueue_script( 'lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true );

    // Theme Stylesheet
    wp_enqueue_style( 'shimge-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Core Theme JS
    wp_enqueue_script( 'shimge-core', get_template_directory_uri() . '/assets/js/shimge-core.js', array( 'jquery' ), '1.0.0', true );

    // Localize Script for AJAX
    wp_localize_script( 'shimge-core', 'shimge_ajax', array(
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'nonce'    => wp_create_nonce( 'shimge_rfq_nonce' )
    ) );
}
add_action( 'wp_enqueue_scripts', 'shimge_theme_scripts' );

// 3. AJAX Handler for RFQ Quote Request
function shimge_handle_rfq_submission() {
    check_ajax_referer( 'shimge_rfq_nonce', 'nonce' );

    $company = sanitize_text_field( $_POST['company'] ?? '' );
    $phone   = sanitize_text_field( $_POST['phone'] ?? '' );
    $email   = sanitize_email( $_POST['email'] ?? '' );
    $comment = sanitize_textarea_field( $_POST['comment'] ?? '' );
    $product = sanitize_text_field( $_POST['product'] ?? 'Общий запрос КП' );

    $admin_email = get_option( 'admin_email', 'info@shimge.uz' );
    $subject     = "Новый запрос КП SHIMGE: {$company} ({$phone})";
    $body        = "Получен новый запрос коммерческого предложения с сайта:\n\n"
                 . "Компания / Имя: {$company}\n"
                 . "Телефон: {$phone}\n"
                 . "Email: {$email}\n"
                 . "Оборудование: {$product}\n"
                 . "Комментарий / ТЗ: {$comment}\n"
                 . "Дата: " . current_time( 'mysql' );

    $headers = array( 'Content-Type: text/plain; charset=UTF-8', 'From: SHIMGE Uzbekistan <no-reply@shimge-uzbekistan.uz>' );

    wp_mail( $admin_email, $subject, $body, $headers );

    wp_send_json_success( array( 'message' => 'Заявка на КП успешно принята! Инженер свяжется с вами.' ) );
}
add_action( 'wp_ajax_shimge_rfq', 'shimge_handle_rfq_submission' );
add_action( 'wp_ajax_nopriv_shimge_rfq', 'shimge_handle_rfq_submission' );

// 4. Custom Currency Display for Uzbekistan So'm
add_filter( 'woocommerce_currencies', 'shimge_add_uzs_currency' );
function shimge_add_uzs_currency( $currencies ) {
    $currencies['UZS'] = __( 'Узбекский сум (UZS)', 'shimge' );
    return $currencies;
}

add_filter( 'woocommerce_currency_symbol', 'shimge_add_uzs_currency_symbol', 10, 2 );
function shimge_add_uzs_currency_symbol( $currency_symbol, $currency ) {
    if ( $currency === 'UZS' ) {
        $currency_symbol = ' сум';
    }
    return $currency_symbol;
}
