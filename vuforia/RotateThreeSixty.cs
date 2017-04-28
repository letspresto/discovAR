using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RotateThreeSixty : MonoBehaviour {
	public float totalRotation = 0;
	public float rotationAmount, rotateTimer, rotateTimerOG, speed;
	public Quaternion originalRotation;

	// Use this for initialization
	void Start () {
		originalRotation = transform.localRotation;
	}
	
	// Update is called once per frame
	void Update () {
		rotateTimer -= Time.deltaTime;
		if (rotateTimer <= 0) {
			if (Mathf.Abs (totalRotation) < Mathf.Abs (rotationAmount)) {
				float currentAngle = transform.rotation.eulerAngles.z;
				transform.rotation = Quaternion.AngleAxis (currentAngle + (Time.deltaTime * speed), Vector3.forward);
				totalRotation += Time.deltaTime * speed;
			} else {
				rotateTimer = rotateTimerOG;
				transform.rotation = originalRotation;
				totalRotation = 0;

			}
		}

	}
}
