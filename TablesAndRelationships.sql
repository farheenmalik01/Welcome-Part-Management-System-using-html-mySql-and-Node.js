
CREATE TABLE User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Role VARCHAR(255),
    PersonalDetails VARCHAR(255),
    DietaryPreferences VARCHAR(255)
);

CREATE TABLE Student (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    RegistrationStatus VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Family (
    FamilyID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    FamilyMembers VARCHAR(255),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);

CREATE TABLE MenuSuggestion (
    MenuSuggestionID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    Item VARCHAR(255),
    Votes INT,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);

CREATE TABLE DinnerMenu (
    DinnerMenuID INT PRIMARY KEY AUTO_INCREMENT,
    Date DATE,
    MenuItemsList TEXT
);

CREATE TABLE PerformanceProposal (
    ProposalID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    PerformanceType VARCHAR(255),
    Duration VARCHAR(255),
    SpecialRequirements VARCHAR(255),
    Votes INT,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
);

CREATE TABLE Performances (
    PerformanceID INT PRIMARY KEY AUTO_INCREMENT,
    ProposalID INT,
    Date DATE,
    Time TIME,
    Venue VARCHAR(255),
    FOREIGN KEY (ProposalID) REFERENCES PerformanceProposal(ProposalID)
);

CREATE TABLE Teacher (
    TeacherID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ComplimentaryRegistration VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE TeacherFamily (
    TeacherFamilyID INT PRIMARY KEY AUTO_INCREMENT,
    TeacherID INT,
    NumberOfMembers INT,
    FOREIGN KEY (TeacherID) REFERENCES Teacher(TeacherID)
);

CREATE TABLE Task (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    OrganizerID INT,
    TaskDescription VARCHAR(255),
    ProgressStatus VARCHAR(255),
    FOREIGN KEY (OrganizerID) REFERENCES User(UserID)
);

CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY AUTO_INCREMENT,
    EventDate DATE,
    StudentID INT,
    TeacherID INT,
    FamilyID INT,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
    FOREIGN KEY (TeacherID) REFERENCES Teacher(TeacherID),
    FOREIGN KEY (FamilyID) REFERENCES Family(FamilyID)
);

CREATE TABLE Budget (
    BudgetID INT PRIMARY KEY AUTO_INCREMENT,
    Category VARCHAR(255),
    AllocatedAmount DECIMAL(10, 2),
    ExpenseAmount DECIMAL(10, 2)
);

CREATE TABLE Announcement (
    AnnouncementID INT PRIMARY KEY AUTO_INCREMENT,
    OrganizerID INT,
    AnnouncementText TEXT,
    FOREIGN KEY (OrganizerID) REFERENCES User(UserID)
);

CREATE TABLE Invitation (
    InvitationID INT PRIMARY KEY AUTO_INCREMENT,
    ManagerID INT,
    Design VARCHAR(255),
    DistributionMethod VARCHAR(255),
    FOREIGN KEY (ManagerID) REFERENCES User(UserID)
);

CREATE TABLE RehearsalSchedule (
    RehearsalID INT PRIMARY KEY AUTO_INCREMENT,
    PerformanceID INT,
    Date DATE,
    Time TIME,
    Venue VARCHAR(255),
    FOREIGN KEY (PerformanceID) REFERENCES PerformanceProposal(ProposalID)
);

CREATE TABLE Event (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    Date DATE,
    Venue VARCHAR(255),
    OrganizerID INT,
    FOREIGN KEY (OrganizerID) REFERENCES User(UserID)
);

CREATE TABLE TaskAssignments (
    AssignmentID INT PRIMARY KEY AUTO_INCREMENT,
    TaskID INT,
    AssigneeID INT,
    Deadline DATE,
    Status VARCHAR(255),
    FOREIGN KEY (TaskID) REFERENCES Task(TaskID),
    FOREIGN KEY (AssigneeID) REFERENCES User(UserID)
);
