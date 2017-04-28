using UnityEngine;
using System.Collections.Generic;
using Vuforia;

public class VirtualButtonAction : MonoBehaviour, IVirtualButtonEventHandler
{

	//public Animator anim;
	//public Transform my3DObject;
	public Vuforia.Image scheduleImage;
	public GameObject roomPlanDisplayer;
	private SpriteRenderer roomPlanDisplayerRenderer;
	//bool buttonTest = true; 


	// Use this for initialization
	void Start () {
		// Search for all Children from this ImageTarget with type VirtualButtonBehaviour
		VirtualButtonBehaviour[] vbs = GetComponentsInChildren<VirtualButtonBehaviour>();
		for (int i = 0; i < vbs.Length; ++i)
		{
			// Register with the virtual buttons TrackableBehaviour
			vbs[i].RegisterEventHandler(this);
			Debug.Log ("This is button: " + vbs [i]);
			vbs [i].name = "button_" + i;
			//Debug.Log ("This is the first button!" + vbs [0]);
			//Debug.Log ("This is the second button!" + vbs [1]); 
		}


		roomPlanDisplayerRenderer = roomPlanDisplayer.GetComponent<SpriteRenderer> ();
	}

	// Update is called once per frame
	void Update () {
	}

	//Action when button pressed
	public void OnButtonPressed(VirtualButtonAbstractBehaviour vb)
	{
		//vb.
		Debug.Log("OnButtonPressed Debug " + vb.VirtualButtonName + " " + vb.name);

		if (vb.name == "button_0") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("MeetingRoom"); 
		} else if (vb.name == "button_1") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("Room15"); 
		} else if (vb.name == "button_2") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("Room20"); 
		} else if (vb.name == "button_3") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("Room50");
		} else if (vb.name == "button_4") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("ConfRoom"); 
		}
			
	}

	/// Called when the virtual button has just been released:
	public void OnButtonReleased(VirtualButtonAbstractBehaviour vb)
	{
		Debug.Log("Button released!");

		if (vb.name == "button_0") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("MeetingRoom"); 
		} else if (vb.name == "button_1") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("Room15"); 
		} else if (vb.name == "button_2") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("Room20"); 
		} else if (vb.name == "button_3") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("Room50");
		} else if (vb.name == "button_4") {
			roomPlanDisplayerRenderer.sprite = Resources.Load<Sprite> ("ConfRoom"); 
		}
			
	}
}
	