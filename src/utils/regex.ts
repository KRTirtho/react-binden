/**
 * All of the regex here are provided by https://digitalfortress.tech/js/top-15-commonly-used-regex/
 * Created on May 30, 2018 by Niket Pathak
 * Thanks to Niket Pathak [Portfolio](https://niketpathak.com/)
 * 
 * In future more regex will get added with the help of community & OSS
 * contribution
 */


// number
export const wholeNumber = /^\d+$/;
export const decimalNumber = /^\d*\.\d+$/;
export const wholeDecimalNumber = /^\d*(\.\d+)?$/;
export const signedDecimalNumber = /^-?\d*(\.\d+)?$/;
export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


// string
export const moderatePassword = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
export const complexPassword = /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|: ; "'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
export const url = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
export const passport = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/;


// date
export const date_yyyy_mm_dd = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
export const date_dd_MM_yyyy = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
export const date_dd_mmm_yyyy = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;


// time
export const time_hours12 = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
export const time_hours12AM_PM = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
export const time_hours24 = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
export const time_hours24WithSeconds = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;


// alphanumeric
export const alphanumeric_spaceless = /^[a-zA-Z0-9]*$/;
export const alphanumeric_spaced = /^[a-zA-Z0-9 ]*$/;