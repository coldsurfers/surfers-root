package com.applemaps

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.AppleMapsViewManagerInterface
import com.facebook.react.viewmanagers.AppleMapsViewManagerDelegate

@ReactModule(name = AppleMapsViewManager.NAME)
class AppleMapsViewManager : SimpleViewManager<AppleMapsView>(),
  AppleMapsViewManagerInterface<AppleMapsView> {
  private val mDelegate: ViewManagerDelegate<AppleMapsView>

  init {
    mDelegate = AppleMapsViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<AppleMapsView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): AppleMapsView {
    return AppleMapsView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: AppleMapsView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "AppleMapsView"
  }
}
