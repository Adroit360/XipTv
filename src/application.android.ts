
import { ViewBase } from "tns-core-modules/ui/core/view-base";
import {
    AndroidActivityCallbacks,
    setActivityCallbacks,
} from "tns-core-modules/ui/frame";

@JavaProxy("com.tns.NativeScriptTVActivity")
class Activity extends androidx.appcompat.app.AppCompatActivity {
    public isNativeScriptActivity;
    private _callbacks: AndroidActivityCallbacks;

    private highlightedElement: ViewBase;

    onCreate(savedInstanceState: android.os.Bundle): void {
        this.isNativeScriptActivity = true;
        this.isNativeScriptActivity = true;
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }
        this._callbacks.onCreate(
            this,
            savedInstanceState,
            this.getIntent(),
            super.onCreate
        );
    }

    public onSaveInstanceState(outState: android.os.Bundle): void {
        
        this._callbacks.onSaveInstanceState(
            this,
            outState,
            super.onSaveInstanceState
        );
    }

    public onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    public onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    public onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(
        requestCode: number,
        permissions: Array<string>,
        grantResults: Array<number>
    ): void {
        this._callbacks.onRequestPermissionsResult(
            this,
            requestCode,
            permissions,
            grantResults,
            undefined /*TODO: Enable if needed*/
        );
    }

    public onActivityResult(
        requestCode: number,
        resultCode: number,
        data: android.content.Intent
    ): void {
        this._callbacks.onActivityResult(
            this,
            requestCode,
            resultCode,
            data,
            super.onActivityResult
        );
    }

    public dispatchKeyEvent(event: android.view.KeyEvent): boolean {
        // you can respond to specific keycodes by fi. registering a listener and invoking it when appropriate
        try{

            // if(event == null){
            //     return true;
            //    // return super.dispatchKeyEvent(event);
            // }

            let isDpadCenter = android.view.KeyEvent.KEYCODE_DPAD_CENTER
            console.log(
                "D-Pad center button pressed? " +
                    (event.getKeyCode() == isDpadCenter)
            );
    
            // let's highlight the element that currently has the focus
            let focusedElement = this.getCurrentFocus()["jsview"];
            // if(focusedElement == null){
            //     return true;
            //     //return super.dispatchKeyEvent(event);
            // }
            const tnsButton = <ViewBase>focusedElement;
            // if(tnsButton == null){
            //     return true;
            //     //return super.dispatchKeyEvent(event);
            // }
            if (tnsButton != null && tnsButton != this.highlightedElement) {
                tnsButton.addPseudoClass("focused");
                if (this.highlightedElement != null) {
                    this.highlightedElement.deletePseudoClass("focused");
                }
                this.highlightedElement = tnsButton;
            }
            var dispatch = super.dispatchKeyEvent(event);
            console.log("DISPATCH",dispatch);
            if(dispatch!=null)
            return dispatch;
            else
            return true;
        }catch(ex){

            return true;
        }
        
    }
}
