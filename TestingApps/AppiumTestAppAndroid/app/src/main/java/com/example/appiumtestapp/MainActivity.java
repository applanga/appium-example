package com.example.appiumtestapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;

import com.applanga.android.Applanga;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        Applanga.dispatchTouchEvent(ev, this);
        return super.dispatchTouchEvent(ev);
    }

    public void onClick(View view) {
        Intent intent = new Intent(this, Activity2.class);
        startActivity(intent);
    }
}