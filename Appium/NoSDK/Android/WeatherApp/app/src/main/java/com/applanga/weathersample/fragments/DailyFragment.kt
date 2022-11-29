package com.applanga.weathersample.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.applanga.weathersample.MainActivity
import com.applanga.weathersample.R
import com.applanga.weathersample.adapters.DailyAdapter
import com.applanga.weathersample.classes.SharedPrefrencesManager.Keys
import com.applanga.weathersample.classes.WeatherAppApplication
import com.applanga.weathersample.databinding.FragmentDailyBinding
import com.applanga.weathersample.networking.modules.daily.Day

class DailyFragment : Fragment() {

    private lateinit var binding: FragmentDailyBinding
    private val displayedDays = WeatherAppApplication.app.sharedPrefrencesManager.getInt(
        Keys.DAYS_NUMBER_KEY.toString(),
        5
    )
    private val dailyAdapterMutableData = mutableListOf<Day>()
    private lateinit var dailyAdapter: DailyAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentDailyBinding.inflate(inflater)
        setDailyObserver()
        initUiDaily()
        return binding.root
    }

    private fun setDailyObserver() {
        if (requireActivity() is MainActivity) {
            (requireActivity() as MainActivity).dailyWeather.observe(viewLifecycleOwner) {
                dailyAdapterMutableData.addAll(it.list.subList(0, displayedDays * 8))
                dailyAdapter.notifyDataSetChanged()
            }
        }
    }

    private fun initUiDaily() {
        dailyAdapter = DailyAdapter(this.requireContext(), dailyAdapterMutableData)

        binding.apply {
            dailyRecyclerView.layoutManager = LinearLayoutManager(requireContext())
            dailyRecyclerView.adapter = dailyAdapter
            dailyDaysDisplay.text = resources.getQuantityString(
                R.plurals.daily_day_number,
                displayedDays,
                displayedDays
            )
        }
    }
}