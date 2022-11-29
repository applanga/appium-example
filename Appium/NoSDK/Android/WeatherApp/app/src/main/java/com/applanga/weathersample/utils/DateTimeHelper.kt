package com.applanga.weathersample.utils

import android.content.Context
import com.applanga.weathersample.R
import java.text.SimpleDateFormat
import java.util.*
import java.util.Calendar.*

class DateTimeHelper(val context: Context) {

    private fun getDayNameFromInt(dayNumber: Int? = null): String {
        return when (dayNumber ?: getInstance().get(DAY_OF_WEEK)) {
            1 -> context.resources.getString(R.string.days_sunday)
            2 -> context.resources.getString(R.string.days_monday)
            3 -> context.resources.getString(R.string.days_tuesday)
            4 -> context.resources.getString(R.string.days_wednesday)
            5 -> context.resources.getString(R.string.days_thursday)
            6 -> context.resources.getString(R.string.days_friday)
            7 -> context.resources.getString(R.string.days_saturday)
            else -> context.resources.getString(R.string.not_available)
        }
    }

    private fun getDayNameFromString(dayNumber: String): String {
        return when (dayNumber) {
            "Sunday" -> context.resources.getString(R.string.days_sunday)
            "Monday" -> context.resources.getString(R.string.days_monday)
            "Tuesday" -> context.resources.getString(R.string.days_tuesday)
            "Wednesday" -> context.resources.getString(R.string.days_wednesday)
            "Thursday" -> context.resources.getString(R.string.days_thursday)
            "Friday" -> context.resources.getString(R.string.days_friday)
            "Saturday" -> context.resources.getString(R.string.days_saturday)
            else -> context.resources.getString(R.string.not_available)
        }
    }

    private fun getMonthName(monthNumber: String? = null): String {
        return when (monthNumber ?: SimpleDateFormat("LLLL").format(getInstance().time)) {
            "January" -> context.resources.getString(R.string.month_january)
            "February" -> context.resources.getString(R.string.month_february)
            "March" -> context.resources.getString(R.string.month_march)
            "April" -> context.resources.getString(R.string.month_april)
            "May" -> context.resources.getString(R.string.month_may)
            "June" -> context.resources.getString(R.string.month_june)
            "July" -> context.resources.getString(R.string.month_july)
            "August" -> context.resources.getString(R.string.month_august)
            "September" -> context.resources.getString(R.string.month_september)
            "October" -> context.resources.getString(R.string.month_october)
            "November" -> context.resources.getString(R.string.month_november)
            "December" -> context.resources.getString(R.string.month_december)
            else -> context.resources.getString(R.string.not_available)
        }
    }

    fun getCurrentDate(): String {
        val date = getInstance().get(DAY_OF_MONTH)

        return "${getDayNameFromInt()}, ${getMonthName()} $date"
    }

    fun getFullDate(givenDate: String): String {
        val format = SimpleDateFormat("yyyy-MM-dd").parse(givenDate) as Date
        val dayName = SimpleDateFormat("EEEE", Locale.ENGLISH).format(format)
        val monthName = SimpleDateFormat("LLLL").format(getInstance().time)

        return "${getDayNameFromString(dayName)}, ${getMonthName(monthName)} ${givenDate.substring(8, 10)}"
    }
}