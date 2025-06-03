# Website Data Guide

This folder contains all the content data for the website. You can edit these files to update the information displayed on the website without touching any of the website code.

## Table of Contents

- [How to Edit Files](#how-to-edit-files)
- [Collaborations Data](#collaborations-data)
- [Projects Data](#projects-data)
- [Research Data](#research-data)
- [Common Questions](#common-questions)

## How to Edit Files

### Important Rules

1. **Don't change the file names** - keep the files named exactly as they are
2. **Don't delete the first and last lines** of each file (`export const...` and closing `];`)
3. **Maintain the format** - each entry follows the same pattern with commas and curly braces
4. **Always save your changes** after editing

### Step-by-Step Editing

1. Open the file you want to edit using a text editor like Notepad, Notepad++, Visual Studio Code, or TextEdit
2. Find the entry you want to change
3. Edit only the text between quotes `"example text"`
4. Save the file
5. Refresh the website to see your changes

## Collaborations Data

File: `collaborations.js`

This file controls the collaborations section of the website. Each entry has:

- **id**: A unique number (keep these in order)
- **name**: Name of the institution
- **logo**: URL to the institution's logo image
- **description**: Brief text about the collaboration
- **website**: Link to the institution's website

### Example Entry

```javascript
{
  id: 5,
  name: "BMVSS (Jaipur Foot)",
  logo: "https://www.jaipurfoot.org/wp-content/uploads/2023/07/Logo-2.png",
  description: "Developing affordable prosthetic solutions for amputees in partnership with this NGO.",
  website: "https://www.jaipurfoot.org/"
},
```

### How to Add a New Collaboration

1. Copy an existing entry (include the curly braces `{}` and the comma at the end)
2. Paste it before the last `];` line
3. Change the `id` to the next number in sequence
4. Update the other fields with new information
5. Make sure there is a comma after the closing brace `},`

### How to Remove a Collaboration

1. Delete the entire block for that collaboration (from opening `{` to closing `},`)
2. Make sure the remaining entries still have commas between them

## Projects Data

File: `projects.js`

This file controls the projects section of the website. Each entry has:

- **id**: A unique number
- **title**: Project name
- **description**: Text explaining the project
- **image**: Either a URL or a reference to an imported image
- **category**: One of: "wearable", "foldable", "exoskeleton", or "assistance"
- **url**: Link to the project details (can be "#" if no link exists)
- **technologies**: List of technologies used in the project

### Example Entry

```javascript
{
  id: 2,
  title: "Sixth Robotic Finger (SRF)",
  description: "A robotic sixth finger design that provides supplementary grasping capabilities to assist individuals with hand impairments or for enhanced manipulation.",
  image: "https://static.wixstatic.com/media/fbe72c_ee7122692ad4403c9d25190d5644d1e0~mv2.png/v1/crop/x_8,y_0,w_502,h_242/fill/w_440,h_190,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SRF.png",
  category: "assistance",
  url: "#",
  technologies: ["Soft Robotics", "Assistive Technology", "Hand Augmentation"]
},
```

### About Image Sources

For project images, you can either:

1. Use a direct URL to an image on the internet (must start with `http://` or `https://`)
2. Use one of the existing image references: `"first"`, `"third"`, `"fifth"`, or `"sixth"`

If you want to add new project images, please contact your web developer.

### Project Categories

The website allows filtering projects by category. Use only these categories:

- `"wearable"` - For wearable robotic devices
- `"foldable"` - For foldable/metamorphic mechanisms
- `"exoskeleton"` - For exoskeleton systems
- `"assistance"` - For assistive technologies

## Research Data

File: `research.js`

This file controls the research topics section. Each entry has:

- **id**: A unique number
- **icon**: An emoji that represents the research area
- **title**: Name of the research area
- **description**: Text explaining the research focus
- **keywords**: List of keywords/topics within that research area

### Example Entry

```javascript
{
  id: 3,
  icon: "🦿",
  title: "Exoskeletons & Exosuits",
  description: "Creating wearable robotic systems for rehabilitation, assistive support, and performance enhancement in industrial and medical applications.",
  keywords: ["Upper Limb Exoskeletons", "Soft Exosuits", "Rehabilitation Robotics"]
},
```

### About Emoji Icons

To change an icon, you can copy-paste a different emoji from websites like [Emojipedia](https://emojipedia.org/) or use the emoji picker on your device.

## Common Questions

### How do I add more than 3 keywords/technologies?

Just add more items inside the square brackets, separated by commas. For example:

```javascript
technologies: ["First Item", "Second Item", "Third Item", "Fourth Item"];
```

### What if my text is very long?

For long descriptions, you can split the text across multiple lines:

```javascript
description: "This is the first part of my description " +
  "and this is the second part of my description.",
```

### What if I make a mistake and the website breaks?

If you save a file with errors and the website stops working:

1. Reopen the file you just edited
2. Look for missing quotes, commas, or braces
3. If you can't find the error, restore from your latest backup or contact your web developer

### Do I need to restart the website after making changes?

No, but you will need to refresh your browser to see the changes.

---

If you need further assistance, please contact your web developer.
