# **UI Plugins Usage Guidelines**

Welcome to the UI Plugins usage guide! This document outlines the best practices for incorporating UI plugins into our project. Adhering to these principles ensures consistency, maintainability, and scalability.

## **Guidelines**

### **1. No Direct Imports**

- UI plugins should not be directly imported into individual files.
- Always use the designated parent component to ensure a single source of truth.

---

### **2. Parent Component for Each Plugin**

- Create a parent (or wrapper) component for every UI plugin component.
- This simplifies updates and modifications by centralizing the logic and configuration.

---

### **3. Consistent Naming Convention**

- **Parent Components**: Use camelCase for component names (e.g., `CustomButton`).
- **Folders**: Use snake_case for organizing similar components into folders (e.g., `buttons`, `modals`).
- Examples:
  ```
  src/
  └── components/
      └── buttons/
          ├── CustomButton.jsx
          └── SubmitButton.jsx
      └── modals/
          ├── AlertModal.jsx
          └── ConfirmationModal.jsx
  ```

---

### **4. Centralized Directory**

- Store all parent components in the `src/components/` directory to ensure they are easy to locate and manage.

---

### **5. Minimal Logic in Parent Components**

- Parent components should focus on:
  - Plugin configuration.
  - Styling and customization.
- Avoid adding excessive logic to keep them clean and maintainable.

---

### **6. Document Plugin Usage**

- Maintain a `README.md` file within the plugin directory.
- Include:
  - **Purpose** of the plugin.
  - **How to use** the parent component.
  - **Customization options** or configuration details.

---

## **Example File Structure**

```
src/
└── components/
    ├── buttons/
    │   ├── CustomButton.jsx
    │   ├── SubmitButton.jsx
    │   └── README.md
    ├── modals/
    │   ├── AlertModal.jsx
    │   ├── ConfirmationModal.jsx
    │   └── README.md
```

## **Contributions and Feedback**

Feel free to share your thoughts or suggest improvements to these guidelines! Together, we can maintain a clean, scalable project.

---

### **Authored by**

Dozie Chuks  
DC Community Admin

---
