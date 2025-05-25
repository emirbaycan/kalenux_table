# kalenux\_table

A lightweight, modular, template-driven JavaScript table renderer for dynamic web applications.
Enables developers to create interactive tables from JSON data sources using reusable HTML templates—perfect for dashboards, application listings, admin panels, or contact form management.

---

## Features

* **Template-Based Rendering:**
  Define row layouts via `<kalenux-template>` elements for maximum flexibility.
* **Dynamic Data Binding:**
  Populates tables from external JSON data endpoints or JavaScript arrays.
* **Configurable Headers & Ordering:**
  Use `data-header` and `data-order` attributes to fully control table appearance and sorting.
* **Action Button Support:**
  Easily inject view, edit, delete, or custom action buttons within any row.
* **Separation of Data & Presentation:**
  Example data (`applications_data.js`) and label mappings (`application_types.js`) are kept separate for clarity and reusability.

---

## Quick Start

1. **Clone or Download the Repository**
2. **Open `example.html`** in your browser for a live demo with sample data.

---

## File Structure

```
kalenux_table/
│
├── example.html           # Demo page with live table usage
├── application_types.js   # Mapping of application type codes to human-friendly labels
├── applications_data.js   # Example array of application data (mocked for demo)
├── page.top.js            # Table logic (initialization, data rendering)
├── page.bot.css           # Minimal styling for table appearance
└── README.md
```

---

## How It Works

### 1. Table Container

Define your table with a `div` using the `kalenux-tables` class and configure with data attributes:

```html
<div class="kalenux-tables"
     data-order='{"6":0}'
     data-nav="true"
     data-header="Position,Full Name,Phone,Email,Cover Letter,CV,Application Time,Actions"
     data-type="user"
     data-url="get/applications"
     data-id="item"></div>
```

* `data-header`: Comma-separated column names.
* `data-order`: Optional, column sort order.
* `data-url`: URL or data key for fetching application data (for demo, this is handled by JS).
* `data-id`: Template ID to use for row rendering.

### 2. Row Template

Define how each row should look using a `<kalenux-template>`:

```html
<kalenux-template id="item">
  <item class="kt-cell" id="item_+id+">
    <ul class="kt-cell-inner">
      <li class="kt-item">+application_type:application_types+</li>
      <li class="kt-item">+fullname+</li>
      <li class="kt-item">+phone+</li>
      <li class="kt-item">+email+</li>
      <li class="kt-item">+cover_letter+</li>
      <li class="kt-item">+cv.parseCv+</li>
      <li class="kt-item">+created_at+</li>
      <li class="kt-item">+id.getActions+</li>
    </ul>
  </item>
</kalenux-template>
```

* `+field+` placeholders are replaced by corresponding properties from your data.
* `+application_type:application_types+` will map application type via `application_types.js`.
* `+cv.parseCv+` supports nested values (like CV download/view links).
* `+id.getActions+` supports row-specific action buttons (view, delete, etc.).

### 3. Example Data

**`application_types.js`:**

```js
const application_types = {
  "General Application": "General Application",
  "Software Developer": "Software Developer",
  "Internship": "Internship"
};
```

**`applications_data.js`:**

```js
const applications_data = [
  {
    "id": 1,
    "application_type": "General Application",
    "fullname": "John Doe",
    "phone": "+90 532 123 45 67",
    "email": "john.doe@example.com",
    "cover_letter": "I am interested in joining your team and believe my skills fit your needs.",
    "cv": {
      "parseCv": "<a href='/uploads/cv/john_doe_cv.pdf' target='_blank'>View CV</a>"
    },
    "created_at": "2024-06-01 12:32",
    "getActions": "<button class='btn-view' data-id='1'>View</button> <button class='btn-delete' data-id='1'>Delete</button>"
  }
  // Add more items as needed
];
```

You can expand these data files as needed for your real application.

---

## Integration & Customization

* **Add or remove columns** in `data-header` and update the template as needed.
* **Change field names or mappings** to suit your own dataset (contact forms, user lists, etc.).
* **Customize styling** via `page.bot.css` or add your own CSS.
* **Extend logic** in `page.top.js` to support custom actions or AJAX loading.

---

## Notes

* For best results, keep data and templates modular and DRY.
* The component is framework-agnostic (no dependencies on React, Vue, etc.).
* Designed for modern browsers.

---

## License

MIT License

---

*Created by [emirbaycan](https://github.com/emirbaycan). For questions, issues, or suggestions, please open an issue or PR.*
