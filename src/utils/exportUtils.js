import * as XLSX from "xlsx";

export const downloadStudentsReportExcel = (reportData) => {
  if (reportData.length === 0) {
    alert("No student found for the selected filters.");
    return;
  }

  const headerLabels = {
    id: "ID",
    name: "Name",
    age: "Age",
    grade: "Grade",
    gender: "Gender",
    vaccineTaken: "Vaccine Taken",
  };

  const headers = Object.keys(reportData[0]);
  const formattedData = [];

  reportData.forEach((row) => {
    const formattedRow = {};

    headers.forEach((key) => {
      const label = headerLabels[key] || key;

      if (key === "vaccineTaken") {
        const vaccineTaken = row[key] || [];

        if (vaccineTaken.length === 0)
          formattedRow[label] = "No vaccines taken";
        else {
          formattedRow[label] = vaccineTaken
            .map((v) => `${v.name} (${v.dateOfVaccination})`)
            .join(", ");
        }
      } else {
        formattedRow[label] = row[key];
      }
    });

    formattedData.push(formattedRow);
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students Report");

  XLSX.writeFile(workbook, "students_report.xlsx");
};

export const downloadVaccinationDrivesReportExcel = (reportData) => {
  if (reportData.length === 0) {
    alert("No vaccination drive found for the selected filters.");
    return;
  }

  const headerLabels = {
    id: "ID",
    driveName: "Drive Name",
    vaccineName: "Vaccine Name",
    driveDate: "Drive Date",
    location: "Location",
    applicableGrades: "Applicable Grades",
    availableDoses: "Available Doses",
    vaccinatedStudents: "Vaccinated Students",
  };

  const headers = Object.keys(reportData[0]);
  const formattedData = [];

  reportData.forEach((row) => {
    const vaccinatedStudents = row.vaccinatedStudents || [];

    if (vaccinatedStudents.length > 0) {
      vaccinatedStudents.forEach((student) => {
        const formattedRow = {};

        headers.forEach((key) => {
          const label = headerLabels[key] || key;

          if (key === "vaccinatedStudents") {
            formattedRow[
              label
            ] = `${student.name} (${student.gender}, Age: ${student.age} years, Grade: ${student.grade}, ${row.driveDate})`;
          } else if (key === "applicableGrades") {
            formattedRow[label] = row[key].join(", ");
          } else {
            formattedRow[label] = row[key];
          }
        });

        formattedData.push(formattedRow);
      });
    } else {
      const formattedRow = {};

      headers.forEach((key) => {
        const label = headerLabels[key] || key;

        if (key === "vaccinatedStudents") {
          formattedRow[label] = "No students were vaccinated in this drive";
        } else {
          formattedRow[label] = row[key];
        }
      });

      formattedData.push(formattedRow);
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Vaccination Drives");
  XLSX.writeFile(workbook, "vaccination_drives_report.xlsx");
};

export const downloadStudentsReportCSV = (reportData) => {
  if (reportData.length === 0) {
    alert("No student found for the selected filters.");
    return;
  }

  const headerLabels = {
    id: "ID",
    name: "Name",
    age: "Age",
    grade: "Grade",
    gender: "Gender",
    vaccineTaken: "Vaccine Taken",
  };

  const headers = Object.keys(reportData[0]);
  const csvHeaders = headers.map((key) => headerLabels[key] || key);

  const rows = reportData.map((row) =>
    headers
      .map((key) => {
        const value = row[key];

        if (key === "vaccineTaken") {
          const vaccineTaken = row[key] || [];

          if (vaccineTaken.length === 0) return '"No vaccines taken"';

          return `"${vaccineTaken
            .map((vaccine) => `${vaccine.name} (${vaccine.dateOfVaccination})`)
            .join(", ")}"`;
        }

        return `"${value}"`;
      })
      .join(",")
  );

  const csvContent = [csvHeaders.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "students_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadVaccinationDrivesReportCSV = (reportData) => {
  if (reportData.length === 0) {
    alert("No vaccination drive found for the selected filters.");
    return;
  }

  const headerLabels = {
    id: "ID",
    driveName: "Drive Name",
    vaccineName: "Vaccine Name",
    driveDate: "Drive Date",
    location: "Location",
    applicableGrades: "Applicable Grades",
    availableDoses: "Available Doses",
    vaccinatedStudents: "Vaccinated Students",
  };

  const headers = Object.keys(reportData[0]);
  const csvHeaders = headers.map((key) => headerLabels[key] || key);

  const rows = [];

  reportData.forEach((row) => {
    const vaccinatedStudents = row.vaccinatedStudents || [];

    if (vaccinatedStudents.length > 0) {
      vaccinatedStudents.forEach((student) => {
        const rowData = headers.map((key) => {
          if (key === "vaccinatedStudents") {
            return `"${student.name} (${student.gender}, Age: ${student.age} years, Grade: ${student.grade}, ${row.driveDate})"`;
          } else {
            const value = row[key];
            return `"${value}"`;
          }
        });

        rows.push(rowData.join(","));
      });
    } else {
      const rowData = headers.map((key) =>
        key === "vaccinatedStudents"
          ? '"No students were vaccinated in this drive"'
          : `"${row[key]}"`
      );

      rows.push(rowData.join(","));
    }
  });

  const csvContent = [csvHeaders.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "vaccination_drives_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
