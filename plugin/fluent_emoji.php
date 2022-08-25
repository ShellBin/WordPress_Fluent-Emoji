<?php
/*
Plugin Name: Fluent Emoji for WordPress
Plugin URI: https://blog.shellbin.me/?p=2208
Description: Switch your WordPress site from Twemoji to Fluent Emoji.
Version: 0.1
Author: ShellBin
Author URI: https://shellbin.me
*/

add_filter( 'emoji_svg_url', 'replace_SVG' );
add_filter( 'emoji_url', 'replace_PNG' );

function replace_SVG( $url ) {
    return 'https://blog.shellbin.me/wp-content/uploads/theme-resource/emoji/';
}

function replace_PNG( $url ) {
    return 'https://blog.shellbin.me/wp-content/uploads/theme-resource/emoji/';
}
?>