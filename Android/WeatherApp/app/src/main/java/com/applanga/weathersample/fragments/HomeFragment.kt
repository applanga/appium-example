package com.applanga.weathersample.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.applanga.weathersample.MainActivity
import com.applanga.weathersample.databinding.FragmentHomeBinding
import com.applanga.weathersample.networking.modules.current.ApiResponseCurrent
import com.applanga.weathersample.utils.DateTimeHelper
import com.applanga.weathersample.utils.IconHelper

class HomeFragment : Fragment() {

    lateinit var binding: FragmentHomeBinding

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View {
        binding = FragmentHomeBinding.inflate(inflater)
        setHomeObserver()
        return binding.root
    }

    private fun setHomeObserver() {
        if (requireActivity() is MainActivity) {
            (requireActivity() as MainActivity).currentWeather.observe(viewLifecycleOwner) {
                initUiHome(it)
                hideSpinner()
            }
        }
    }

    private fun hideSpinner() {
        binding.apply {
            homeProgressBarBackground.visibility = View.GONE
            homeProgressBarSpinner.visibility = View.GONE
        }
    }

    private fun initUiHome(apiResponse: ApiResponseCurrent?) {
        if (apiResponse != null) {
            binding.apply {
                homeWeather = apiResponse
                homeDate.text = DateTimeHelper(requireContext()).getCurrentDate()
                homeWeatherIcon.setImageResource(IconHelper.getWeatherIcon(apiResponse.weather[0].icon))
            }
        }
    }

}