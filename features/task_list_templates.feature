@tasks
Feature: Create task list tempates and convert them to tasks

  Background:
    Given @mislav exists and is logged in
    And I am currently in the project ruby_rockstars
    And I am an administrator in the organization called "ACME"

  Scenario: I create a task list template
    When I go to the task list templates page for the "ACME" organization

