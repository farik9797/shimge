<?php
/**
 * Main Template File (Fallback)
 *
 * @package SHIMGE_Uzbekistan
 */

get_header(); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4'); ?>>
                <h1 class="text-2xl sm:text-3xl font-black text-slate-900"><?php the_title(); ?></h1>
                <div class="prose max-w-none text-slate-700 text-sm leading-relaxed">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile;
    endif;
    ?>
</div>

<?php get_footer(); ?>
