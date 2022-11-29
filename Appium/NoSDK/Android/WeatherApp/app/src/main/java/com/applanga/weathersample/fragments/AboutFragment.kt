package com.applanga.weathersample.fragments

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.fragment.app.Fragment
import com.applanga.weathersample.R


class AboutFragment : Fragment() {
  override   fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
          val view: View = inflater.inflate(R.layout.fragment_about, container, false)

        return view
    }
}